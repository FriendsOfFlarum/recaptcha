import { extend, override } from 'flarum/extend';
import SignUpModal from 'flarum/components/SignUpModal';

import Recaptcha from './components/Recaptcha';

app.initializers.add('fof/recaptcha', () => {
    extend(SignUpModal.prototype, 'submitData', function(data) {
        data['g-recaptcha-response'] = this.recaptcha.getResponse();
    });

    extend(SignUpModal.prototype, 'fields', function(fields) {
        fields.add('recaptcha', (this.recaptcha = new Recaptcha()), -5);
    });

    extend(SignUpModal.prototype, 'onerror', function() {
        this.recaptcha.reset();
    });
});
