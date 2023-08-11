import app from 'flarum/forum/app';
import ForgotPasswordModal from 'flarum/forum/components/ForgotPasswordModal';
import LogInModal from 'flarum/forum/components/LogInModal';
import SignUpModal from 'flarum/forum/components/SignUpModal';
import { extend, override } from 'flarum/common/extend';

import RecaptchaState from '../common/states/RecaptchaState';
import Recaptcha from '../common/components/Recaptcha';

export const addRecaptchaToAuthModal = <T extends typeof ForgotPasswordModal | typeof LogInModal | typeof SignUpModal>({
  modal,
  type,
  dataMethod,
}: {
  modal: T;
  type: string;
  dataMethod: string;
}) => {
  const isEnabled = () => !!app.forum.attribute(`fof-recaptcha.${type}`);

  extend(modal.prototype, 'oninit', function () {
    if (!isEnabled()) return;

    this.recaptcha = new RecaptchaState(
      app.forum.data.attributes,
      () => {
        if (this.recaptcha.isInvisible()) {
          // Create "fake" event so this works when other extensions extend onsubmit as well
          const event = new Event('submit');
          event.isRecaptchaSecondStep = true;
          this.onsubmit(event);
        }
      },
      (alertAttrs) => {
        // Removes the spinner on the submit button so we can try again
        this.loaded();
        this.alertAttrs = alertAttrs;
      }
    );
  });

  extend(modal.prototype, dataMethod, function (data) {
    if (!isEnabled()) return;

    data['g-recaptcha-response'] = this.recaptcha.getResponse();
  });

  extend(modal.prototype, 'fields', function (fields) {
    if (!isEnabled()) return;

    fields.add('recaptcha', <Recaptcha state={this.recaptcha} />, -5);
  });

  extend(modal.prototype, 'onerror', function () {
    if (!isEnabled()) return;

    this.recaptcha.reset();
  });

  override(modal.prototype, 'onsubmit', function (original, e) {
    if (isEnabled() && this.recaptcha.isInvisible() && !e.isRecaptchaSecondStep) {
      // When recaptcha is invisible, onsubmit will be called two times
      // First time with normal event, we will call recaptcha.execute
      // Second time is called from recaptcha callback with a special isRecaptcha attribute
      e.preventDefault();
      this.loading = true;
      this.recaptcha.execute();
      return;
    }

    return original(e);
  });
};

export default () => {
  addRecaptchaToAuthModal({ modal: ForgotPasswordModal, type: 'forgot', dataMethod: 'requestParams' });
  addRecaptchaToAuthModal({ modal: LogInModal, type: 'signin', dataMethod: 'loginParams' });
  addRecaptchaToAuthModal({ modal: SignUpModal, type: 'signup', dataMethod: 'submitData' });
};
