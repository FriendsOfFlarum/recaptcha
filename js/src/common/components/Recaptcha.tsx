import type Mithril from 'mithril';
import app from 'flarum/common/app';
import Component, { ComponentAttrs } from 'flarum/common/Component';
import RecaptchaState from '../states/RecaptchaState';

interface RecaptchaAttrs extends ComponentAttrs {
  state: RecaptchaState;
}

let loadPromise: Promise<void> | null = null;

function loadRecaptcha(locale: string, state: RecaptchaState): Promise<void> {
  if (window.grecaptcha?.render) return Promise.resolve();
  if (loadPromise) return loadPromise;

  // v3 requires the site key in the script URL so grecaptcha.ready fires and execute(siteKey,{action}) works.
  // v2 requires `render=explicit` so we can call grecaptcha.render() ourselves per-widget.
  const query = new URLSearchParams({ hl: locale });

  if (state.isV3()) {
    query.set('render', state.siteKey);
  } else {
    query.set('render', 'explicit');
  }

  loadPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://www.recaptcha.net/recaptcha/api.js?${query.toString()}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => {
      loadPromise = null;
      reject(new Error('Failed to load reCAPTCHA script'));
    };
    document.head.appendChild(script);
  });

  return loadPromise;
}

export default class Recaptcha extends Component<RecaptchaAttrs> {
  view(): Mithril.Children {
    // v3 has no visible widget, but we still render a marker node so upstream layouts stay stable.
    if (this.attrs.state.isV3()) {
      return <div className="Form-group" id="fof-recaptcha" />;
    }

    return (
      <div className="Form-group" id="fof-recaptcha">
        <div className="g-recaptcha" />
      </div>
    );
  }

  oncreate(vnode: Mithril.VnodeDOM<RecaptchaAttrs, this>): void {
    super.oncreate(vnode);

    loadRecaptcha(app.translator.getLocale(), this.attrs.state).catch(() => {
      // Surfacing the load failure is the caller's job; silently swallow here so a blocked CDN
      // doesn't throw an unhandled rejection in the console.
    });

    if (this.attrs.state.isV3()) return;

    const target = vnode.dom.querySelector<HTMLElement>('.g-recaptcha');
    if (!target) return;

    const waitForApi = () => {
      if (window.grecaptcha?.render) {
        this.attrs.state.render(target);

        // Invisible reCAPTCHA injects an iframe that is focusable by default, which is confusing
        // when the widget is visually hidden. Remove it from the tab order.
        if (this.attrs.state.isInvisible()) {
          const iframe = vnode.dom.querySelector('iframe');
          if (iframe) iframe.tabIndex = -1;
        }

        return;
      }

      setTimeout(waitForApi, 50);
    };

    loadRecaptcha(app.translator.getLocale(), this.attrs.state).then(waitForApi);
  }
}
