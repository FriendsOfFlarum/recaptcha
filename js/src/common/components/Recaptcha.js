import app from 'flarum/common/app';
import Component from 'flarum/common/Component';
import load from 'external-load';

const addResources = async () => {
  if (app.recaptchaLoaded) return;

  await load.js(`https://www.recaptcha.net/recaptcha/api.js?hl=${app.translator.getLocale()}&render=explicit`);

  app.recaptchaLoaded = true;
};

export default class Recaptcha extends Component {
  oninit(vnode) {
    super.oninit(vnode);
  }

  view() {
    return (
      <div className="Form-group" id="fof-recaptcha">
        <div className="g-recaptcha" />
      </div>
    );
  }

  oncreate(vnode) {
    super.oncreate(vnode);

    addResources().then(() => {
      const interval = setInterval(() => {
        if (window.recaptcha) {
          clearInterval(interval);
          this.attrs.state.render(vnode.dom.querySelector('.g-recaptcha'));
        }
      }, 250);
    });

    // It's possible to TAB into the reCAPTCHA iframe, and it's very confusing when using the invisible mode
    if (this.attrs.state.type === 'invisible') {
      const iframe = vnode.dom.querySelector('iframe');

      if (iframe) {
        iframe.tabIndex = -1;
      }
    }
  }
}
