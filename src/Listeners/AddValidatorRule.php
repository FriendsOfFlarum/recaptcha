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
use Flarum\Foundation\MaintenanceMode;
use Flarum\Locale\TranslatorInterface;
use Flarum\Settings\SettingsRepositoryInterface;
use FoF\ReCaptcha\ReCaptcha\GuzzleRequestMethod;
use FoF\ReCaptcha\Utils;
use Illuminate\Support\Arr;
use Illuminate\Validation\Validator;
use ReCaptcha\ReCaptcha;

class AddValidatorRule
{
    public function __construct(
        protected SettingsRepositoryInterface $settings,
        protected MaintenanceMode $maintenanceMode
    ) {
    }

    public function __invoke(AbstractValidator $flarumValidator, Validator $validator): void
    {
        if (!Utils::isExtensionSetup($this->settings)) {
            return;
        }

        $secret = (string) $this->settings->get('fof-recaptcha.credentials.secret');
        $type = Utils::type($this->settings);
        $threshold = (float) $this->settings->get('fof-recaptcha.v3_threshold', 0.5);

        $validator->addExtension(
            'recaptcha',
            function ($attribute, $value, $parameters) use ($validator, $secret, $type, $threshold) {
                if (empty($value)) {
                    return false;
                }

                $client = new ReCaptcha($secret, new GuzzleRequestMethod('https://www.recaptcha.net/recaptcha/api/siteverify'));

                if ($type === 'v3') {
                    $client->setScoreThreshold($threshold);

                    $expectedAction = Arr::get($validator->getData(), 'g-recaptcha-action');

                    if (is_string($expectedAction) && $expectedAction !== '') {
                        $client->setExpectedAction($expectedAction);
                    }
                }

                $verification = $client->verify($value);

                if (!empty($verification->getErrorCodes())) {
                    $validator->setCustomMessages([
                        'recaptcha' => resolve('translator')->trans('validation.recaptcha-unknown', [
                            'errors' => implode(', ', $verification->getErrorCodes()),
                        ]),
                    ]);
                }

                return $verification->isSuccess();
            }
        );

        $addRule = (
            ($flarumValidator instanceof LogInValidator && $this->settings->get('fof-recaptcha.signin')) ||
            ($flarumValidator instanceof ForgotPasswordValidator && $this->settings->get('fof-recaptcha.forgot'))
        );

        if ($addRule && !$this->maintenanceMode->inMaintenanceMode()) {
            $validator->addRules([
                'g-recaptcha-response' => ['required', 'recaptcha'],
            ]);
            $validator->setCustomMessages([
                'g-recaptcha-response.required' => resolve(TranslatorInterface::class)->trans('fof-recaptcha.lib.not_completed'),
            ]);
        }
    }
}
