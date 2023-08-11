<?php

namespace FoF\ReCaptcha\Api\Controller;

use Flarum\Http\RequestUtil;
use FoF\ReCaptcha\Validators\RecaptchaValidator;
use Illuminate\Support\Arr;
use Laminas\Diactoros\Response\EmptyResponse;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;

class TestReCaptchaController implements RequestHandlerInterface
{
    /**
     * @var RecaptchaValidator
     */
    protected $validator;

    public function __construct(RecaptchaValidator $validator)
    {
        $this->validator = $validator;
    }

    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $actor = RequestUtil::getActor($request);

        $actor->assertAdmin();

        $data = $request->getParsedBody();

        $this->validator->assertValid([
            'recaptcha' => Arr::get($data, 'g-recaptcha-response'),
        ]);

        return new EmptyResponse();
    }
}
