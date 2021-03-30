<?php

/*
 * This file is part of fof/recaptcha.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\ReCaptcha\Content;

use Flarum\Frontend\Document;

class AddRecaptchaJs
{
    public function __invoke(Document $document)
    {
        $locale = app('translator')->getLocale();

        $document->head[] = "<script src=\"https://www.recaptcha.net/recaptcha/api.js?hl=$locale&render=explicit\" async defer></script>";
    }
}
