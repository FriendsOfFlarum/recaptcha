import { settings } from '@fof-components';

const {
    SettingsModal,
    items: { StringItem, SelectItem },
} = settings;

app.initializers.add('fof/recaptcha', () => {
    app.extensionSettings['fof-recaptcha'] = () =>
        app.modal.show(SettingsModal, {
            title: app.translator.trans('fof-recaptcha.admin.settings.title'),
            type: 'medium',
            items: (s) => [
                <p>
                    {app.translator.trans('fof-recaptcha.admin.settings.help_text', {
                        a: <a href="http://www.google.com/recaptcha/admin" target="_blank" />,
                    })}
                </p>,
                <div className="Form-group">
                    <label>{app.translator.trans('fof-recaptcha.admin.settings.type_label')}</label>

                    {SelectItem.component({
                        options: {
                            checkbox: 'Checkbox',
                            invisible: 'Invisible',
                        },
                        name: 'fof-recaptcha.type',
                        setting: s,
                        required: true,
                        default: 'checkbox',
                    })}
                </div>,
                <StringItem setting={s} name="fof-recaptcha.credentials.site" required>
                    {app.translator.trans('fof-recaptcha.admin.settings.site_key_label')}
                </StringItem>,
                <StringItem setting={s} name="fof-recaptcha.credentials.secret" required>
                    {app.translator.trans('fof-recaptcha.admin.settings.secret_key_label')}
                </StringItem>,
            ],
        });
});
