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

use Flarum\Api\ForgotPasswordValidator;
use Flarum\Forum\LogInValidator;
use Flarum\Foundation\AbstractValidator;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Validation\Validator;
use ReCaptcha\ReCaptcha;
use ReCaptcha\RequestMethod\Post;

class AddValidatorRule
{
    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    /**
     * @param SettingsRepositoryInterface $settings
     */
    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    public function __invoke(AbstractValidator $flarumValidator, Validator $validator)
    {
        $secret = $this->settings->get('fof-recaptcha.credentials.secret');

        $validator->addExtension(
            'recaptcha',
            function ($attribute, $value, $parameters) use ($secret) {
                return !empty($value) && (new ReCaptcha($secret, new Post('https://www.recaptcha.net/recaptcha/api/siteverify')))->verify($value)->isSuccess();
            }
        );

        if ($flarumValidator instanceof LogInValidator && $this->settings->get('fof-recaptcha.signin')) {
            $validator->addRules([
                'g-recaptcha-response' => ['required', 'recaptcha'],
            ]);
        }

        if ($flarumValidator instanceof ForgotPasswordValidator && $this->settings->get('fof-recaptcha.forgot')) {
            $validator->addRules([
                'g-recaptcha-response' => ['required', 'recaptcha'],
            ]);
        }
    }
}
