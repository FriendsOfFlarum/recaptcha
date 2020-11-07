import { extend, override } from 'flarum/extend';
import SignUpModal from 'flarum/components/SignUpModal';

import Recaptcha from './components/Recaptcha';

app.initializers.add('fof/recaptcha', () => {
    const type = app.data['fof-recaptcha.type'];
    let submitCallback;

    extend(SignUpModal.prototype, 'submitData', function(data) {
        data['g-recaptcha-response'] = this.recaptcha && this.recaptcha.getResponse();
    });

    extend(SignUpModal.prototype, 'fields', function(fields) {
        const opts =
            type === 'invisible'
                ? {
                      type,
                      size: 'invisible',
                      callback: () => submitCallback(),
                  }
                : {};

        fields.add('recaptcha', (this.recaptcha = Recaptcha.component(opts)), -5);
    });

    extend(SignUpModal.prototype, 'onerror', function() {
        this.recaptcha && this.recaptcha.reset();
    });

    if (type === 'invisible') {
        override(SignUpModal.prototype, 'onsubmit', function(original, e) {
            e.preventDefault();

            submitCallback = () => original(e);

            this.recaptcha && this.recaptcha.execute();
        });
    }
});
