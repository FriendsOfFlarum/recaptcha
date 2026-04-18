import app from 'flarum/forum/app';
import { extend, override } from 'flarum/common/extend';
import type ItemList from 'flarum/common/utils/ItemList';
import type Mithril from 'mithril';
import RecaptchaState from '../common/states/RecaptchaState';
import Recaptcha from '../common/components/Recaptcha';

export const isRecaptchaConfigured = (): boolean => !!app.forum.attribute('fof-recaptcha.configured');
export const canPostWithoutCaptcha = (): boolean => !!app.forum.attribute('postWithoutCaptcha');
export const shouldUseCaptcha = (): boolean => isRecaptchaConfigured() && !canPostWithoutCaptcha();

interface ComposerWithRecaptcha {
  recaptcha: RecaptchaState;
  recaptchaToken: string | null;
  loading: boolean;
  onsubmit: (arg?: string) => void;
}

export default function extendComposer(modulePath: string, action: string): void {
  extend(modulePath, 'oninit', function () {
    if (!shouldUseCaptcha()) return;

    const self = this as unknown as ComposerWithRecaptcha;

    self.recaptcha = new RecaptchaState(app.forum.data!.attributes as Record<string, string>, action, () => {
      // Callback is unused here; the async acquireToken() flow handles invisible/v3, and v2 checkbox
      // reads the token synchronously via getResponse() at submit time.
    });
    self.recaptchaToken = null;
  });

  extend(modulePath, 'data', function (data: Record<string, unknown>) {
    if (!shouldUseCaptcha()) return;

    const self = this as unknown as ComposerWithRecaptcha;

    // For v2 checkbox we read the token straight from the widget. For invisible/v3 we use the token
    // previously captured in the onsubmit override below.
    data['g-recaptcha-response'] = self.recaptcha.requiresAsyncToken() ? (self.recaptchaToken ?? '') : self.recaptcha.getResponse();
    data['g-recaptcha-action'] = self.recaptcha.action;
  });

  extend(modulePath, 'headerItems', function (items: ItemList<Mithril.Children>) {
    if (!shouldUseCaptcha()) return;

    const self = this as unknown as ComposerWithRecaptcha;

    // The Recaptcha component is rendered for every type, including v3 (where it's an invisible
    // marker div). Mounting it in all modes is how the grecaptcha script gets loaded.
    items.add('recaptcha', <Recaptcha state={self.recaptcha} />, -5);
  });

  // There's no onerror handler on composer classes, but we can react to loaded which is called after errors.
  extend(modulePath, 'loaded', function () {
    if (!shouldUseCaptcha()) return;

    const self = this as unknown as ComposerWithRecaptcha;
    self.recaptchaToken = null;
    self.recaptcha.reset();
  });

  override(modulePath, 'onsubmit', function (original: unknown, ...args: unknown[]) {
    const self = this as unknown as ComposerWithRecaptcha;
    const proceed = () => (original as (...a: unknown[]) => unknown)(...args);

    if (!shouldUseCaptcha()) {
      return proceed();
    }

    // v2 checkbox: block the submit client-side if the user hasn't completed the captcha, rather
    // than letting the server reject the post with a generic validation error.
    if (!self.recaptcha.requiresAsyncToken() && !self.recaptcha.getResponse()) {
      app.alerts.show({ type: 'error' }, app.translator.trans('fof-recaptcha.lib.not_completed'));
      return;
    }

    if (!self.recaptcha.requiresAsyncToken() || self.recaptchaToken !== null) {
      return proceed();
    }

    self.loading = true;
    self.recaptcha
      .acquireToken()
      .then((token) => {
        self.recaptchaToken = token;
        proceed();
      })
      .catch(() => {
        self.loading = false;
        m.redraw();
      });
  });
}
