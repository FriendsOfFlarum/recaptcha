<?php

namespace FoF\ReCaptcha\Validators;

use Flarum\Foundation\AbstractValidator;

class RecaptchaValidator extends AbstractValidator
{
    /**
     * {@inheritdoc}
     */
    protected $rules = [
        'recaptcha' => [
            'required',
            'recaptcha',
        ],
    ];
}
