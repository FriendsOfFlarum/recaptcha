/* global grecaptcha, app */

export default class RecaptchaState {
    constructor(callback, errorCallback = null) {
        this.callback = callback;
        this.errorCallback =
            errorCallback ||
            ((alertAttrs) => {
                // By default, the alert will just be shown globally
                app.alerts.show(alertAttrs);
            });
        this.widgetId = null;
    }

    render(element) {
        this.widgetId = grecaptcha.render(element, {
            sitekey: app.data['fof-recaptcha.credentials.site'],
            theme: app.forum.attribute('darkMode') ? 'dark' : 'light',
            type: app.data['fof-recaptcha.type'],
            size: app.data['fof-recaptcha.type'] === 'invisible' ? 'invisible' : 'normal',
            callback: this.callback,
            'error-callback': () => {
                // Similarly to error.alert, we create an alert payload that can then be shown in-context depending where the code is called from
                const alertAttrs = {
                    type: 'error',
                    content: app.translator.trans('fof-recaptcha.forum.error'),
                };
                this.errorCallback(alertAttrs);
            },
        });
    }

    getResponse() {
        return grecaptcha.getResponse(this.widgetId);
    }

    execute() {
        return grecaptcha.execute(this.widgetId);
    }

    reset() {
        return grecaptcha.reset(this.widgetId);
    }
}
