import app from 'flarum/common/app';
import type { AlertAttrs } from 'flarum/common/components/Alert';

export type RecaptchaType = 'checkbox' | 'invisible' | 'v3';

type RecaptchaSettings = Record<string, string>;

type SuccessCallback = (response: string) => void;
type ErrorCallback = (alertAttrs: AlertAttrs) => void;

export default class RecaptchaState {
  settings: RecaptchaSettings;
  callback: SuccessCallback;
  errorCallback: ErrorCallback;
  widgetId: number | null = null;
  type: RecaptchaType;
  action: string;

  constructor(settings: RecaptchaSettings, action: string, callback: SuccessCallback, errorCallback: ErrorCallback | null = null) {
    this.settings = settings;
    this.callback = callback;
    this.errorCallback =
      errorCallback ||
      ((alertAttrs) => {
        app.alerts.show(alertAttrs);
      });

    this.type = (this.settings['fof-recaptcha.type'] as RecaptchaType) || 'checkbox';
    this.action = action;
  }

  get siteKey(): string {
    return this.settings['fof-recaptcha.credentials.site'];
  }

  isInvisible(): boolean {
    return this.type === 'invisible';
  }

  isV3(): boolean {
    return this.type === 'v3';
  }

  /**
   * True if acquiring a token requires an async call (v2 invisible, v3).
   * False for v2 checkbox, where the token is already present in the widget once the user has ticked it.
   */
  requiresAsyncToken(): boolean {
    return this.isInvisible() || this.isV3();
  }

  /**
   * v2 only: render the widget into `element`. v3 has no visible widget.
   */
  render(element: HTMLElement): void {
    if (this.isV3()) return;

    // `grecaptcha` is guaranteed by the caller (Recaptcha component) to be loaded before render() is invoked.
    this.widgetId = window.grecaptcha!.render!(element, {
      sitekey: this.siteKey,
      theme: this.isDark() ? 'dark' : 'light',
      type: this.type === 'invisible' ? 'invisible' : 'checkbox',
      size: this.isInvisible() ? 'invisible' : 'normal',
      tabindex: this.isInvisible() ? -1 : undefined,
      callback: this.callback,
      'error-callback': () => {
        this.errorCallback({
          type: 'error',
          content: app.translator.trans('fof-recaptcha.lib.error'),
        });
      },
    });
  }

  /**
   * Synchronously read the current widget response. v2 checkbox only — returns the token the user has
   * ticked, or an empty string if they haven't. Not meaningful for v2 invisible or v3.
   */
  getResponse(): string {
    if (this.requiresAsyncToken()) return '';

    return window.grecaptcha!.getResponse(this.widgetId ?? undefined);
  }

  /**
   * Resolve a reCAPTCHA token asynchronously. Needed for:
   * - v2 invisible: triggers `execute()` on the widget and resolves when the callback fires.
   * - v3: calls `grecaptcha.execute(siteKey, { action })` and resolves with the returned token.
   * For v2 checkbox this resolves immediately with whatever the user ticked (may be empty).
   */
  acquireToken(): Promise<string> {
    if (this.isV3()) {
      return window.grecaptcha!.execute(this.siteKey, { action: this.action });
    }

    if (this.isInvisible()) {
      return new Promise((resolve) => {
        const original = this.callback;
        this.callback = (response) => {
          this.callback = original;
          resolve(response);
        };

        window.grecaptcha!.execute(this.widgetId ?? undefined);
      });
    }

    return Promise.resolve(this.getResponse());
  }

  reset(): void {
    // v3 has no widget state to reset; tokens are one-shot.
    if (this.isV3()) return;

    window.grecaptcha!.reset(this.widgetId ?? undefined);
  }

  private isDark(): boolean {
    // Core applies the effective color scheme as a data-theme attribute on <html>,
    // which reflects per-user overrides, system preference, and admin defaults.
    return document.documentElement.getAttribute('data-theme')?.startsWith('dark') ?? false;
  }
}
