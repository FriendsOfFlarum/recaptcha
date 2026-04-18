<?php

/*
 * This file is part of fof/recaptcha.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\ReCaptcha\Api;

use Flarum\Api\Schema;

/**
 * Write-only pass-through fields for the captcha token and action.
 *
 * These fields don't persist anything; they exist purely to let
 * `g-recaptcha-response` / `g-recaptcha-action` survive the 2.x JSON:API
 * schema validation and reach the `Saving` event listeners, which read
 * them from `$event->data['attributes']` and hand them to the validator.
 */
class RecaptchaFields
{
    public function __invoke(): array
    {
        return [
            Schema\Str::make('g-recaptcha-response')
                ->writableOnCreate()
                ->nullable()
                ->set(fn () => null),
            Schema\Str::make('g-recaptcha-action')
                ->writableOnCreate()
                ->nullable()
                ->set(fn () => null),
        ];
    }
}
