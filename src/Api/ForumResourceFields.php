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
use Flarum\Api\Schema;
use Flarum\Settings\SettingsRepositoryInterface;
use FoF\ReCaptcha\Utils;

class ForumResourceFields
{
    public function __construct(protected SettingsRepositoryInterface $settings)
    {
    }

    public function __invoke(): array
    {
        return [
            Schema\Boolean::make('fof-recaptcha.configured')
                ->get(fn () => Utils::isExtensionSetup($this->settings)),
            Schema\Boolean::make('postWithoutCaptcha')
                ->get(fn (object $model, Context $context) => $context->getActor()->hasPermission('fof-recaptcha.postWithoutCaptcha')),
        ];
    }
}
