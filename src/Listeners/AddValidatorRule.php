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
use FoF\ReCaptcha\ReCaptcha\GuzzleRequestMethod;
use Illuminate\Validation\Validator;
use ReCaptcha\ReCaptcha;

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
            function ($attribute, $value, $parameters) use ($validator, $secret) {
                if (empty($value)) {
                    return false;
                }

                $verification = (new ReCaptcha($secret, new GuzzleRequestMethod('https://www.recaptcha.net/recaptcha/api/siteverify')))->verify($value);

                if (!empty($verification->getErrorCodes())) {
                    $validator->setCustomMessages(
                        [
                            'recaptcha' => resolve('translator')->trans('validation.recaptcha-unknown', ['errors' => implode(', ', $verification->getErrorCodes())])]
                    );
                }

                return $verification->isSuccess();
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
