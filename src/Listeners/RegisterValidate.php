<?php

/*
 * This file is part of fof/recaptcha.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\ReCaptcha\Listeners;

use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\Event\Saving;
use FoF\ReCaptcha\Utils;
use FoF\ReCaptcha\Validators\RecaptchaValidator;
use Illuminate\Support\Arr;

class RegisterValidate
{
    public function __construct(protected RecaptchaValidator $validator, protected SettingsRepositoryInterface $settings)
    {
    }

    public function handle(Saving $event): void
    {
        if (!Utils::isExtensionSetup($this->settings)) {
            return;
        }

        // We also check for the actor's admin status, so that we can allow admins to create users from the admin panel without recaptcha blocking the action.
        if (!$event->user->exists && $this->settings->get('fof-recaptcha.signup') && !$event->actor->isAdmin()) {
            $this->validator->assertValid([
                'g-recaptcha-response' => Arr::get($event->data, 'attributes.g-recaptcha-response'),
                'g-recaptcha-action'   => Arr::get($event->data, 'attributes.g-recaptcha-action'),
            ]);
        }
    }
}
