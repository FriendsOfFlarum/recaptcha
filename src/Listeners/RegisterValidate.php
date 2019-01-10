<?php

namespace FoF\ReCaptcha\Listeners;

use Flarum\User\Event\Saving;
use FoF\ReCaptcha\Validators\RecaptchaValidator;

class RegisterValidate
{
    /**
     * @var RecaptchaValidator
     */
    protected $validator;

    /**
     * @param RecaptchaValidator $validator
     */
    public function __construct(RecaptchaValidator $validator)
    {
        $this->validator = $validator;
    }

    public function handle(Saving $event)
    {
        if (!$event->user->exists) {
            $this->validator->assertValid([
                'recaptcha' => array_get($event->data, 'attributes.g-recaptcha-response')
            ]);
        }
    }
}
