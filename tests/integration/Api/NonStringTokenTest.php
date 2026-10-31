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

use FoF\ReCaptcha\Tests\integration\RecaptchaTestCase;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Test;

class NonStringTokenTest extends RecaptchaTestCase
{
    public static function endpoints(): array
    {
        return [
            'log in' => ['/login', [
                'identification' => 'normal',
                'password'       => 'too-obscure',
            ]],
            'forgot password' => ['/api/forgot', [
                'email' => 'normal@machine.local',
            ]],
        ];
    }

    #[Test]
    #[DataProvider('endpoints')]
    public function array_token_is_a_validation_error(string $path, array $body): void
    {
        $body['g-recaptcha-response'] = ['not-a-token'];

        $response = $this->send($this->request('POST', $path, ['json' => $body]));

        $this->assertSame(422, $response->getStatusCode(), (string) $response->getBody());

        $errors = json_decode((string) $response->getBody(), true)['errors'];
        $this->assertSame(['/data/attributes/g-recaptcha-response'], array_column(array_column($errors, 'source'), 'pointer'));
    }
}
