import SettingsModal from 'flarum/components/SettingsModal';
import Select from 'flarum/components/Select';

import StringItem from '@fof/components/admin/settings/items/StringItem';

export default class RecaptchaSettingsModal extends SettingsModal {
    className() {
        return 'FofRecaptchaSettingsModal Modal--medium';
    }

    title() {
        return 'FriendsOfFlarum reCAPTCHA';
    }

    form() {
        return [
            <p>
                {app.translator.trans('fof-recaptcha.admin.settings.help_text', {
                    a: <a href="http://www.google.com/recaptcha/admin" target="_blank" />,
                })}
            </p>,
            <div className="Form-group">
                <label>{app.translator.trans('fof-recaptcha.admin.settings.type_label')}</label>

                {Select.component({
                    options: {
                        checkbox: 'Checkbox',
                        invisible: 'Invisible',
                    },
                    value: this.setting('fof-recaptcha.type')() || 'checkbox',
                    onchange: this.setting('fof-recaptcha.type'),
                })}
            </div>,
            <StringItem key="fof-recaptcha.credentials.site" required>
                {app.translator.trans('fof-recaptcha.admin.settings.site_key_label')}
            </StringItem>,
            <StringItem key="fof-recaptcha.credentials.secret" required>
                {app.translator.trans('fof-recaptcha.admin.settings.secret_key_label')}
            </StringItem>,
        ];
    }
}
