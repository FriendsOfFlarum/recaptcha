import app from 'flarum/forum/app';
import { extend, override } from 'flarum/common/extend';
import type ItemList from 'flarum/common/utils/ItemList';
import type Mithril from 'mithril';
import type { AlertAttrs } from 'flarum/common/components/Alert';
import RecaptchaState from '../common/states/RecaptchaState';
import Recaptcha from '../common/components/Recaptcha';

interface ModalWithRecaptcha {
  recaptcha: RecaptchaState;
  recaptchaToken: string | null;
  alertAttrs: AlertAttrs | null;
  loading: boolean;
  loaded(): void;
  onsubmit(e: Event): void;
}

type AuthModalKind = 'signup' | 'signin' | 'forgot';

interface AuthModalConfig {
  modulePath: string;
  type: AuthModalKind;
  dataMethod: string;
}

function applyAuthModalExtension({ modulePath, type, dataMethod }: AuthModalConfig): void {
  const isEnabled = () => !!app.forum.attribute(`fof-recaptcha.${type}`);
  const shouldApply = () => !!app.forum.attribute('fof-recaptcha.configured') && isEnabled();

  extend(modulePath, 'oninit', function () {
    if (!shouldApply()) return;

    const self = this as unknown as ModalWithRecaptcha;

    self.recaptcha = new RecaptchaState(
      app.forum.data!.attributes as Record<string, string>,
      type,
      () => {
        // Callback is unused; acquireToken() handles invisible/v3 and checkbox is read synchronously.
      },
      (alertAttrs) => {
        // Removes the spinner on the submit button so we can try again.
        self.loaded();
        self.alertAttrs = alertAttrs;
      }
    );
    self.recaptchaToken = null;
  });

  extend(modulePath, dataMethod, function (data: Record<string, unknown>) {
    if (!shouldApply()) return;

    const self = this as unknown as ModalWithRecaptcha;
    data['g-recaptcha-response'] = self.recaptcha.requiresAsyncToken() ? (self.recaptchaToken ?? '') : self.recaptcha.getResponse();
    data['g-recaptcha-action'] = self.recaptcha.action;
  });

  extend(modulePath, 'fields', function (fields: ItemList<Mithril.Children>) {
    if (!shouldApply()) return;

    const self = this as unknown as ModalWithRecaptcha;

    // The Recaptcha component is rendered for every type, including v3 (where it's an invisible
    // marker div). Mounting it in all modes is how the grecaptcha script gets loaded.
    fields.add('recaptcha', <Recaptcha state={self.recaptcha} />, -5);
  });

  extend(modulePath, 'onerror', function (_: unknown, ...args: unknown[]) {
    if (!shouldApply()) return;

    const self = this as unknown as ModalWithRecaptcha;
    const error = args[0] as { alert?: { content?: Mithril.Children } };
    const hadToken = !!self.recaptchaToken;
    self.recaptchaToken = null;
    self.recaptcha.reset();

    // The /login route returns an HTML error page rather than structured JSON for validation failures,
    // so the alert content is empty by the time it reaches us. We infer the most likely cause and
    // surface a clearer message than the generic "unknown error" fallback.
    if (type === 'signin' && error.alert && (!error.alert.content || !(error.alert.content as unknown[]).length)) {
      error.alert.content = app.translator.trans(hadToken ? 'fof-recaptcha.lib.rejected' : 'fof-recaptcha.lib.not_completed');
    }
  });

  override(modulePath, 'onsubmit', function (original: unknown, ...args: unknown[]) {
    const self = this as unknown as ModalWithRecaptcha;
    const e = args[0] as Event;
    const proceed = () => (original as (e: Event) => unknown)(e);

    if (!shouldApply()) {
      return proceed();
    }

    // v2 checkbox: verify the user ticked the box before we submit. Skipping this lets the request
    // fall into the server-side /login HTML error path, which is much harder to report to the user.
    if (!self.recaptcha.requiresAsyncToken() && !self.recaptcha.getResponse()) {
      e.preventDefault();
      self.loaded();
      self.alertAttrs = {
        type: 'error',
        content: app.translator.trans('fof-recaptcha.lib.not_completed'),
      };
      m.redraw();
      return;
    }

    if (!self.recaptcha.requiresAsyncToken() || self.recaptchaToken !== null) {
      return proceed();
    }

    // Two-pass submit: suppress the default submit event until we have a token, then re-enter.
    e.preventDefault();
    self.loading = true;
    m.redraw();

    self.recaptcha
      .acquireToken()
      .then((token) => {
        self.recaptchaToken = token;
        proceed();
      })
      .catch(() => {
        self.loaded();
        self.alertAttrs = {
          type: 'error',
          content: app.translator.trans('fof-recaptcha.lib.error'),
        };
        m.redraw();
      });
  });
}

export default function extendAuthModals(): void {
  applyAuthModalExtension({ modulePath: 'flarum/forum/components/ForgotPasswordModal', type: 'forgot', dataMethod: 'requestParams' });
  applyAuthModalExtension({ modulePath: 'flarum/forum/components/ChangePasswordModal', type: 'forgot', dataMethod: 'requestBody' });
  applyAuthModalExtension({ modulePath: 'flarum/forum/components/LogInModal', type: 'signin', dataMethod: 'loginParams' });
  applyAuthModalExtension({ modulePath: 'flarum/forum/components/SignUpModal', type: 'signup', dataMethod: 'submitData' });
}
