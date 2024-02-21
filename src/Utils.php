<?php

/*
 * This file is part of fof/recaptcha.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\ReCaptcha;

use Flarum\Settings\SettingsRepositoryInterface;

class Utils
{
    public static function isExtensionSetup(SettingsRepositoryInterface $settings): bool
    {
        return trim($settings->get('fof-recaptcha.credentials.site', '')) !== '' && trim($settings->get('fof-recaptcha.credentials.secret', '')) !== '';
    }
}
