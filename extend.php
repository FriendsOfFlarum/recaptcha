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

use Flarum\Api\Event\Serializing;
use Flarum\Extend;
use Flarum\Foundation\Event\Validating;
use Flarum\User\Event\Saving;
use FoF\Components\Extend\AddFofComponents;

return [
    new AddFofComponents(),

    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/resources/less/forum.less')
        ->content(Content\AddRecaptchaJs::class)
        ->content(Content\ExtensionSettings::class),

    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/resources/less/admin.less'),

    new Extend\Locales(__DIR__.'/resources/locale'),

    (new Extend\Event())
        ->listen(Validating::class, Listeners\AddValidatorRule::class)
        ->listen(Serializing::class, Listeners\AddAttributes::class)
        ->listen(Saving::class, Listeners\RegisterValidate::class),
];
