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

use Flarum\Api\ForgotPasswordValidator;
use Flarum\Api\Resource\DiscussionResource;
use Flarum\Api\Resource\ForumResource;
use Flarum\Api\Resource\PostResource;
use Flarum\Api\Resource\UserResource;
use Flarum\Discussion\Event\Saving as DiscussionSaving;
use Flarum\Extend;
use Flarum\Forum\LogInValidator;
use Flarum\Post\Event\Saving as PostSaving;
use Flarum\User\Event\Saving as UserSaving;
use FoF\ReCaptcha\Listeners\AddValidatorRule;
use FoF\ReCaptcha\Validators\RecaptchaValidator;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/resources/less/forum.less'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/resources/less/admin.less'),

    new Extend\Locales(__DIR__.'/resources/locale'),

    (new Extend\Settings())
        ->default('fof-recaptcha.signup', true)
        ->default('fof-recaptcha.signin', true)
        ->default('fof-recaptcha.forgot', true)
        ->default('fof-recaptcha.type', 'checkbox')
        ->default('fof-recaptcha.v3_threshold', 0.5)
        ->serializeToForum('fof-recaptcha.credentials.site', 'fof-recaptcha.credentials.site')
        ->serializeToForum('fof-recaptcha.type', 'fof-recaptcha.type')
        ->serializeToForum('fof-recaptcha.signup', 'fof-recaptcha.signup', 'boolVal')
        ->serializeToForum('fof-recaptcha.signin', 'fof-recaptcha.signin', 'boolVal')
        ->serializeToForum('fof-recaptcha.forgot', 'fof-recaptcha.forgot', 'boolVal'),

    (new Extend\ApiResource(ForumResource::class))
        ->fields(Api\ForumResourceFields::class),

    (new Extend\ApiResource(DiscussionResource::class))
        ->fields(Api\RecaptchaFields::class),

    (new Extend\ApiResource(PostResource::class))
        ->fields(Api\RecaptchaFields::class),

    (new Extend\ApiResource(UserResource::class))
        ->fields(Api\RecaptchaFields::class),

    (new Extend\Routes('api'))
        ->post('/fof/recaptcha/test', 'fof-recaptcha.test', Api\Controller\TestReCaptchaController::class),

    (new Extend\Validator(RecaptchaValidator::class))
        ->configure(AddValidatorRule::class),

    (new Extend\Validator(LogInValidator::class))
        ->configure(AddValidatorRule::class),

    (new Extend\Validator(ForgotPasswordValidator::class))
        ->configure(AddValidatorRule::class),

    (new Extend\Event())
        ->listen(UserSaving::class, Listeners\RegisterValidate::class)
        ->listen(DiscussionSaving::class, Listeners\StartDiscussionValidate::class)
        ->listen(PostSaving::class, Listeners\ReplyPostValidate::class),
];
