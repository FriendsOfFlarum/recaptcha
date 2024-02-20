<?php

namespace FoF\ReCaptcha;

use Flarum\Settings\SettingsRepositoryInterface;

class Utils
{
    static function isExtensionSetup(SettingsRepositoryInterface $settings): bool
    {
        return $settings->get('fof-recaptcha.credentials.site', "") !== "" && $settings->get('fof-recaptcha.credentials.secret', "") !== "";
    }
}
