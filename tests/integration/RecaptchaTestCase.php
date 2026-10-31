<?php

/*
 * This file is part of fof/recaptcha.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\ReCaptcha\Tests\integration;

use Flarum\Extend;
use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;

abstract class RecaptchaTestCase extends TestCase
{
    use RetrievesAuthorizedUsers;

    protected function setUp(): void
    {
        parent::setUp();

        $this->extension('fof-recaptcha');

        // Utils::isExtensionSetup() skips every captcha check until both keys are set.
        $this->setting('fof-recaptcha.credentials.site', 'test-site-key');
        $this->setting('fof-recaptcha.credentials.secret', 'test-secret-key');

        // Guest requests carry no CSRF token; without this they stop at a 400 before the captcha rule runs.
        $this->extend(
            (new Extend\Csrf())
                ->exemptRoute('login')
                ->exemptRoute('forgot')
        );
    }
}
