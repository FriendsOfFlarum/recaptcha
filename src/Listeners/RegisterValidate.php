<?php

/*
 * This file is part of fof/recaptcha.
 *
 * Copyright (c) 2019 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\ReCaptcha\Listeners;

use Flarum\User\Event\Saving;
use FoF\ReCaptcha\Validators\RecaptchaValidator;

class RegisterValidate
{
    /**
     * @var RecaptchaValidator
     */
    protected $validator;

    /**
     * @param RecaptchaValidator $validator
     */
    public function __construct(RecaptchaValidator $validator)
    {
        $this->validator = $validator;
    }

    public function handle(Saving $event)
    {
        if (!$event->user->exists) {
            $this->validator->assertValid([
                'recaptcha' => array_get($event->data, 'attributes.g-recaptcha-response'),
            ]);
        }
    }
}
