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

use Flarum\Api\Context;
use Flarum\Api\Endpoint\Create;
use Flarum\Foundation\ValidationException;
use Flarum\Http\RequestUtil;
use Flarum\Locale\TranslatorInterface;
use Flarum\Settings\SettingsRepositoryInterface;
use FoF\ReCaptcha\Utils;
use Illuminate\Support\Arr;

/**
 * Explains a missing token to clients outside the forum; the Saving listeners verify any token sent.
 */
class RefuseClientsWithoutCaptcha
{
    public function __construct(
        protected SettingsRepositoryInterface $settings,
        protected TranslatorInterface $translator
    ) {
    }

    public function __invoke(Create $endpoint): Create
    {
        return $endpoint->before(function (Context $context) {
            // A post source marks requests that did not come from the forum's own interface.
            if (RequestUtil::getPostSource($context->request) === null
                || !Utils::isExtensionSetup($this->settings)
                // The discussion's own request already covered its first post.
                || $context->internal('isFirstPost')
                || $context->getActor()->hasPermission('fof-recaptcha.postWithoutCaptcha')
            ) {
                return;
            }

            // Runs before core parses the document: leave a malformed one to core's own error.
            if (!is_array(Arr::get($context->body(), 'data'))) {
                return;
            }

            $token = Arr::get($context->body(), 'data.attributes.g-recaptcha-response');

            // Blank as Laravel's `required` rule sees it.
            if (is_string($token) && trim($token) !== '') {
                return;
            }

            throw new ValidationException([
                'g-recaptcha-response' => $this->translator->trans('fof-recaptcha.api.not_available_to_clients', [
                    'permission' => $this->translator->trans('fof-recaptcha.admin.permissions.post_without_captcha'),
                ]),
            ]);
        });
    }
}
