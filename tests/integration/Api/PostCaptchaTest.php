<?php

/*
 * This file is part of fof/recaptcha.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\ReCaptcha\Tests\integration\Api;

use Carbon\Carbon;
use Flarum\Extend;
use Flarum\Group\Group;
use Flarum\Http\RequestUtil;
use Flarum\Post\PostSource;
use FoF\ReCaptcha\Tests\integration\RecaptchaTestCase;
use FoF\ReCaptcha\Validators\RecaptchaValidator;
use Illuminate\Support\Str;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Test;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class PostCaptchaTest extends RecaptchaTestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        $this->prepareDatabase([
            'users' => [
                $this->normalUser(),
            ],
            'discussions' => [
                ['id' => 1, 'title' => 'A discussion', 'slug' => 'a-discussion', 'created_at' => Carbon::now()->subDay(), 'user_id' => 1, 'first_post_id' => 1, 'comment_count' => 1, 'last_post_number' => 1],
            ],
            'posts' => [
                ['id' => 1, 'discussion_id' => 1, 'created_at' => Carbon::now()->subDay(), 'user_id' => 1, 'type' => 'comment', 'content' => '<t><p>First</p></t>', 'number' => 1],
            ],
        ]);
    }

    /**
     * The extension grants the bypass to members on install; forums that want post captchas revoke it.
     */
    protected function requireCaptchaFromMembers(): void
    {
        $this->app();

        $this->database()->table('group_permission')
            ->where('permission', 'fof-recaptcha.postWithoutCaptcha')
            ->where('group_id', Group::MEMBER_ID)
            ->delete();
    }

    public static function clients(): array
    {
        return [
            'access token' => ['token'],
            'MCP' => ['mcp'],
        ];
    }

    protected function asClient(ServerRequestInterface $request, string $client): ServerRequestInterface
    {
        if ($client === 'mcp') {
            return RequestUtil::withPostSource(
                $this->requestAsUser($request, 2),
                new PostSource('mcp', 'MCP')
            );
        }

        $token = Str::random(40);

        $this->database()->table('access_tokens')->insert([
            'token' => $token,
            'user_id' => 2,
            'created_at' => Carbon::now()->toDateTimeString(),
            'last_activity_at' => Carbon::now()->toDateTimeString(),
            'type' => 'developer',
        ]);

        return $request->withHeader('Authorization', "Token $token");
    }

    protected function discussionRequest(array $options = [], array $attributes = []): ServerRequestInterface
    {
        return $this->request('POST', '/api/discussions', $options + ['json' => [
            'data' => [
                'type' => 'discussions',
                'attributes' => ['title' => 'A new discussion', 'content' => 'Its first post.'] + $attributes,
            ],
        ]]);
    }

    protected function replyRequest(array $options = [], array $attributes = []): ServerRequestInterface
    {
        return $this->request('POST', '/api/posts', $options + ['json' => [
            'data' => [
                'type' => 'posts',
                'attributes' => ['content' => 'A reply.'] + $attributes,
                'relationships' => ['discussion' => ['data' => ['type' => 'discussions', 'id' => '1']]],
            ],
        ]]);
    }

    protected function assertCaptchaError(ResponseInterface $response, string $expectedDetail): void
    {
        $body = (string) $response->getBody();

        $this->assertSame(422, $response->getStatusCode(), $body);

        $errors = json_decode($body, true)['errors'];

        $this->assertSame(['/data/attributes/g-recaptcha-response'], array_column(array_column($errors, 'source'), 'pointer'));
        $this->assertSame([$expectedDetail], array_column($errors, 'detail'));
    }

    protected const CLIENT_MESSAGE = 'This forum asks for a reCAPTCHA on new discussions and replies, which can\'t be completed outside the forum\'s own pages, such as through the API or an MCP client. Post from the forum instead, or ask an administrator for the "Create posts and discussions without captcha" permission.';
    protected const FORUM_MESSAGE = 'Please complete the reCAPTCHA check before continuing.';

    protected function fakeVerification(): void
    {
        // Stands in for Google's answer, after the extension registers the real rule.
        $this->extend(
            (new Extend\Validator(RecaptchaValidator::class))
                ->configure(fn ($flarumValidator, $validator) => $validator->addExtension('recaptcha', fn ($attribute, $value) => $value === 'solved'))
        );
    }

    #[Test]
    #[DataProvider('clients')]
    public function client_starting_a_discussion_is_told_why_it_is_refused(string $client): void
    {
        $this->requireCaptchaFromMembers();

        $response = $this->send($this->asClient($this->discussionRequest(), $client));

        $this->assertCaptchaError($response, self::CLIENT_MESSAGE);
    }

    #[Test]
    #[DataProvider('clients')]
    public function client_replying_is_told_why_it_is_refused(string $client): void
    {
        $this->requireCaptchaFromMembers();

        $response = $this->send($this->asClient($this->replyRequest(), $client));

        $this->assertCaptchaError($response, self::CLIENT_MESSAGE);
    }

    #[Test]
    #[DataProvider('clients')]
    public function client_with_the_bypass_permission_posts(string $client): void
    {
        $this->app();

        $response = $this->send($this->asClient($this->discussionRequest(), $client));
        $this->assertSame(201, $response->getStatusCode(), (string) $response->getBody());

        // Flood control would refuse a second post within seconds.
        $this->database()->table('posts')->where('user_id', 2)->update(['created_at' => Carbon::now()->subMinute()]);

        $response = $this->send($this->asClient($this->replyRequest(), $client));
        $this->assertSame(201, $response->getStatusCode(), (string) $response->getBody());
    }

    #[Test]
    #[DataProvider('clients')]
    public function client_that_sends_a_verified_token_posts(string $client): void
    {
        $this->fakeVerification();
        $this->requireCaptchaFromMembers();

        $token = ['g-recaptcha-response' => 'solved'];

        $response = $this->send($this->asClient($this->discussionRequest([], $token), $client));
        $this->assertSame(201, $response->getStatusCode(), (string) $response->getBody());

        $this->database()->table('posts')->where('user_id', 2)->update(['created_at' => Carbon::now()->subMinute()]);

        $response = $this->send($this->asClient($this->replyRequest([], $token), $client));
        $this->assertSame(201, $response->getStatusCode(), (string) $response->getBody());
    }

    #[Test]
    #[DataProvider('clients')]
    public function client_that_sends_a_blank_token_is_told_why_it_is_refused(string $client): void
    {
        $this->requireCaptchaFromMembers();

        $response = $this->send($this->asClient($this->replyRequest([], ['g-recaptcha-response' => '  ']), $client));

        $this->assertCaptchaError($response, self::CLIENT_MESSAGE);
    }

    #[Test]
    #[DataProvider('clients')]
    public function client_that_sends_a_rejected_token_is_refused(string $client): void
    {
        $this->fakeVerification();
        $this->requireCaptchaFromMembers();

        $token = ['g-recaptcha-response' => 'unsolved'];

        foreach ([$this->discussionRequest([], $token), $this->replyRequest([], $token)] as $request) {
            $response = $this->send($this->asClient($request, $client));

            $this->assertSame(422, $response->getStatusCode(), (string) $response->getBody());
            $this->assertSame(['/data/attributes/g-recaptcha-response'], array_column(array_column(json_decode((string) $response->getBody(), true)['errors'], 'source'), 'pointer'));
        }
    }

    #[Test]
    public function client_sending_a_malformed_document_gets_cores_error(): void
    {
        $this->requireCaptchaFromMembers();

        $response = $this->send($this->asClient($this->request('POST', '/api/discussions', ['json' => ['data' => 'nope']]), 'token'));

        $this->assertSame(400, $response->getStatusCode(), (string) $response->getBody());
    }

    #[Test]
    public function forum_session_without_a_token_gets_the_forum_message(): void
    {
        $this->requireCaptchaFromMembers();

        $this->assertCaptchaError($this->send($this->discussionRequest(['authenticatedAs' => 2])), self::FORUM_MESSAGE);
        $this->assertCaptchaError($this->send($this->replyRequest(['authenticatedAs' => 2])), self::FORUM_MESSAGE);
    }
}
