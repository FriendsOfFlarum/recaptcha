<?php

/*
 * This file is part of fof/recaptcha.
 *
 * Copyright (c) 2019 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\ReCaptcha;

use Flarum\Extend;
use Flarum\User\Event\Saving;
use FoF\ReCaptcha\Listeners\AddValidatorRule;
use FoF\ReCaptcha\Validators\RecaptchaValidator;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/resources/less/forum.less')
        ->content(Content\AddRecaptchaJs::class)
        ->content(Content\ExtensionSettings::class),

    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/resources/less/admin.less'),

    new Extend\Locales(__DIR__.'/resources/locale'),

    (new Extend\Settings())
        ->serializeToForum('darkMode', 'theme_dark_mode', function ($val) {
            return (bool) $val;
        }),

    (new Extend\Validator(RecaptchaValidator::class))
        ->configure(AddValidatorRule::class),

    (new Extend\Event())
        ->listen(Saving::class, Listeners\RegisterValidate::class),
];
