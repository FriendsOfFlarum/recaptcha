import app from 'flarum/forum/app';
import { extend, override } from 'flarum/common/extend';
import RecaptchaState from '../common/states/RecaptchaState';
import Recaptcha from '../common/components/Recaptcha';

export const isRecaptchaConfigured = () => app.forum.attribute('fof-recaptcha.configured');
export const canPostWithoutCaptcha = () => app.forum.attribute('postWithoutCaptcha');
export const shouldUseCaptcha = () => isRecaptchaConfigured() && !canPostWithoutCaptcha();

export default function (Composer) {
  extend(Composer.prototype, 'oninit', function () {
    if (!shouldUseCaptcha()) {
      return;
    }

    this.recaptcha = new RecaptchaState(app.forum.data.attributes, () => {
      if (this.recaptcha.isInvisible()) {
        // onsubmit is usually called without any argument.
        // We use the first argument to indicate the second call after invisible recaptcha
        this.onsubmit('recaptchaSecondStep');
      }
    });
  });

  extend(Composer.prototype, 'data', function (data) {
    if (!shouldUseCaptcha()) {
      return;
    }

    data['g-recaptcha-response'] = this.recaptcha.getResponse();
  });

  extend(Composer.prototype, 'headerItems', function (fields) {
    if (!shouldUseCaptcha()) {
      return;
    }

    fields.add(
      'recaptcha',
      Recaptcha.component({
        state: this.recaptcha,
      }),
      -5
    );
  });

  // There's no onerror handler on composer classes, but we can react to loaded which is called after errors
  extend(Composer.prototype, 'loaded', function () {
    if (!shouldUseCaptcha()) {
      return;
    }

    this.recaptcha.reset();
  });

  override(Composer.prototype, 'onsubmit', function (original, argument1) {
    if (shouldUseCaptcha() && this.recaptcha.isInvisible() && argument1 !== 'recaptchaSecondStep') {
      this.loading = true;
      this.recaptcha.execute();
      return;
    }

    return original();
  });
}
