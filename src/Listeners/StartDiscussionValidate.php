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

use Flarum\Discussion\Event\Saving;
use Flarum\Settings\SettingsRepositoryInterface;
use FoF\ReCaptcha\Utils;
use FoF\ReCaptcha\Validators\RecaptchaValidator;
use Illuminate\Support\Arr;

class StartDiscussionValidate
{
    /**
     * @var RecaptchaValidator
     */
    protected $validator;

    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    public function __construct(RecaptchaValidator $validator, SettingsRepositoryInterface $settings)
    {
        $this->validator = $validator;
        $this->settings = $settings;
    }

    public function handle(Saving $event)
    {
        if (!Utils::isExtensionSetup($this->settings)) {
            return;
        }

        if (!$event->discussion->exists) {
            if ($event->actor->hasPermission('fof-recaptcha.postWithoutCaptcha')) {
                return;
            }

            $this->validator->assertValid([
                'recaptcha' => Arr::get($event->data, 'attributes.g-recaptcha-response'),
            ]);
        }
    }
}
