import { extend, override } from 'flarum/common/extend';
import SignUpModal from 'flarum/forum/components/SignUpModal';
import Recaptcha from './components/Recaptcha';
import RecaptchaState from './states/RecaptchaState';

export default function () {
    const isInvisible = app.data['fof-recaptcha.type'] === 'invisible';

    extend(SignUpModal.prototype, 'oninit', function () {
        this.recaptcha = new RecaptchaState(
            () => {
                if (isInvisible) {
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

    extend(SignUpModal.prototype, 'submitData', function (data) {
        data['g-recaptcha-response'] = this.recaptcha.getResponse();
    });

    extend(SignUpModal.prototype, 'fields', function (fields) {
        fields.add(
            'recaptcha',
            Recaptcha.component({
                state: this.recaptcha,
            }),
            -5
        );
    });

    extend(SignUpModal.prototype, 'onerror', function () {
        this.recaptcha.reset();
    });

    override(SignUpModal.prototype, 'onsubmit', function (original, e) {
        if (isInvisible && !e.isRecaptchaSecondStep) {
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
}
