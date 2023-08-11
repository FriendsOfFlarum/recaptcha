<?php

/*
 * This file is part of fof/recaptcha.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\ReCaptcha\ReCaptcha;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\BadResponseException;
use GuzzleHttp\Exception\ConnectException;
use ReCaptcha\ReCaptcha;
use ReCaptcha\RequestMethod;
use ReCaptcha\RequestParameters;

class GuzzleRequestMethod implements RequestMethod
{
    /**
     * @var string
     */
    private $siteVerifyUrl;

    /**
     * @param $siteVerifyUrl string|null
     */
    public function __construct(string $siteVerifyUrl = null)
    {
        $this->siteVerifyUrl = $siteVerifyUrl ?? ReCaptcha::SITE_VERIFY_URL;
    }

    public function submit(RequestParameters $params)
    {
        $client = new Client();

        try {
            $response = $client->post($this->siteVerifyUrl, [
                'form_params' => $params->toArray(),
            ]);

            return $response->getBody()->getContents();
        } catch (\Throwable $e) {
            $error = ReCaptcha::E_UNKNOWN_ERROR;

            if ($e instanceof BadResponseException) {
                $error = ReCaptcha::E_BAD_RESPONSE;
            } elseif ($e instanceof ConnectException) {
                $error = ReCaptcha::E_CONNECTION_FAILED;
            }

            resolve('log')->error('[fof/recaptcha] An error occurred while attempting to use the ReCAPTCHA service.');
            resolve('log')->error($e);

            return sprintf('{"success": false, "error-codes": ["%s"]}', $error);
        }
    }
}
