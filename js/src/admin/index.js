import app from 'flarum/app';

app.initializers.add('fof/recaptcha', () => {
    app.extensionData
        .for('fof-recaptcha')
        .registerSetting({
            label: app.translator.trans('fof-recaptcha.admin.settings.help_text', {
                a: <a href="http://www.google.com/recaptcha/admin" target="_blank" />,
            }),
            type: 'hidden',
        })
        .registerSetting({
            setting: 'fof-recaptcha.type',
            label: app.translator.trans('fof-recaptcha.admin.settings.type_label'),
            options: {
                checkbox: 'Checkbox',
                invisible: 'Invisible',
            },
            required: true,
            default: 'checkbox',
            type: 'select',
        })
        .registerSetting({
            setting: 'fof-recaptcha.credentials.site',
            label: app.translator.trans('fof-recaptcha.admin.settings.site_key_label'),
            type: 'text',
            required: true,
        })
        .registerSetting({
            setting: 'fof-recaptcha.credentials.secret',
            label: app.translator.trans('fof-recaptcha.admin.settings.secret_key_label'),
            type: 'password',
            required: true,
        });
});
