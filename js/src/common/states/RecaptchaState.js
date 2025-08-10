import app from 'flarum/common/app';

export default class RecaptchaState {
  constructor(settings, callback, errorCallback = null) {
    this.settings = settings;
    this.callback = callback;
    this.errorCallback =
      errorCallback ||
      ((alertAttrs) => {
        // By default, the alert will just be shown globally
        app.alerts.show(alertAttrs);
      });
    this.widgetId = null;

    this.type = this.settings['fof-recaptcha.type'];
  }

  render(element) {
    this.widgetId = grecaptcha.render(element, {
      sitekey: this.settings['fof-recaptcha.credentials.site'],
      theme: !!Number(this.settings['theme_dark_mode']) ? 'dark' : 'light',
      type: this.type,
      size: this.isInvisible() ? 'invisible' : 'normal',
      tabindex: this.isInvisible() ? -1 : null,
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

  isInvisible() {
    return this.type === 'invisible';
  }
}
