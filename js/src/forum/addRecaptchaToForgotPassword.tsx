import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import ForgotPasswordModal from 'flarum/forum/components/ForgotPasswordModal';

import Recaptcha from './components/Recaptcha';
import RecaptchaState from './states/RecaptchaState';

export default function addRecaptchaToForgotPassword() {
  extend(ForgotPasswordModal.prototype, 'oninit', function () {
    if (!!!app.forum.attribute('fof-recaptcha.forgot')) return;

    this.recaptcha = new RecaptchaState();
  });

  extend(ForgotPasswordModal.prototype, 'requestParams', function (data) {
    if (!!!app.forum.attribute('fof-recaptcha.forgot')) return;

    data['g-recaptcha-response'] = this.recaptcha.getResponse();
  });

  extend(ForgotPasswordModal.prototype, 'fields', function (fields) {
    if (!!!app.forum.attribute('fof-recaptcha.forgot')) return;

    fields.add(
      'recaptcha',
      Recaptcha.component({
        state: this.recaptcha,
      }),
      -5
    );
  });
}
