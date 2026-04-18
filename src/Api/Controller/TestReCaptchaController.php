<?php

/*
 * This file is part of fof/recaptcha.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\ReCaptcha\Api\Controller;

use Flarum\Http\RequestUtil;
use FoF\ReCaptcha\Validators\RecaptchaValidator;
use Illuminate\Support\Arr;
use Laminas\Diactoros\Response\EmptyResponse;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;

class TestReCaptchaController implements RequestHandlerInterface
{
    public function __construct(protected RecaptchaValidator $validator)
    {
    }

    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        RequestUtil::getActor($request)->assertAdmin();

        $body = (array) $request->getParsedBody();

        $this->validator->assertValid([
            'g-recaptcha-response' => Arr::get($body, 'g-recaptcha-response'),
            'g-recaptcha-action'   => Arr::get($body, 'g-recaptcha-action'),
        ]);

        return new EmptyResponse();
    }
}
