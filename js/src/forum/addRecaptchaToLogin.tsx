import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import LogInModal from 'flarum/forum/components/LogInModal';

import Recaptcha from './components/Recaptcha';
import RecaptchaState from './states/RecaptchaState';

export default function addRecaptchaToLogin() {
  extend(LogInModal.prototype, 'oninit', function () {
    if (!!!app.forum.attribute('fof-recaptcha.signin')) return;

    this.recaptcha = new RecaptchaState();
  });

  extend(LogInModal.prototype, 'loginParams', function (data) {
    if (!!!app.forum.attribute('fof-recaptcha.signin')) return;

    data['g-recaptcha-response'] = this.recaptcha.getResponse();
  });

  extend(LogInModal.prototype, 'fields', function (fields) {
    if (!!!app.forum.attribute('fof-recaptcha.signin')) return;

    fields.add(
      'recaptcha',
      Recaptcha.component({
        state: this.recaptcha,
      }),
      -5
    );
  });
}
