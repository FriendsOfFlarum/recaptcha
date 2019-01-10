import RecaptchaSettingsModal from './components/RecaptchaSettingsModal';

app.initializers.add('fof/recaptcha', () => {
    app.extensionSettings['fof-recaptcha'] = () => app.modal.show(new RecaptchaSettingsModal());
});
