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
        return trim((string) $settings->get('fof-recaptcha.credentials.site', '')) !== ''
            && trim((string) $settings->get('fof-recaptcha.credentials.secret', '')) !== '';
    }

    /**
     * @return 'checkbox'|'invisible'|'v3'
     */
    public static function type(SettingsRepositoryInterface $settings): string
    {
        $type = $settings->get('fof-recaptcha.type', 'checkbox');

        return in_array($type, ['checkbox', 'invisible', 'v3'], true) ? $type : 'checkbox';
    }
}
