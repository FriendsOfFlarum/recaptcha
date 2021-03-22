import Component from 'flarum/Component';

export default class Recaptcha extends Component {
    view() {
        return (
            <div className="Form-group">
                <div className="g-recaptcha" />
            </div>
        );
    }

    oncreate(vnode) {
        super.oncreate(vnode);
        
        new Promise(resolve => {
            if (app.recaptchaLoaded) {
                return resolve();
            }

            app.recaptchaLoaded = true;

            const script = document.createElement('script');
            script.src = `https://www.recaptcha.net/recaptcha/api.js?hl=${app.translator.locale}&render=explicit`;
            script.async = true;
            script.defer = true;
            script.onload = resolve;
            document.body.appendChild(script);
        }).then(() => {
            const interval = setInterval(() => {
                if (window.recaptcha) {
                    clearInterval(interval);
                    this.attrs.state.render(vnode.dom.querySelector('.g-recaptcha'));
                }
            }, 250);
        });

        // It's possible to TAB into the reCAPTCHA iframe, and it's very confusing when using the invisible mode
        if (app.data['fof-recaptcha.type'] === 'invisible') {
            const iframe = vnode.dom.querySelector('iframe');

            if (iframe) {
                iframe.tabIndex = -1;
            }
        }
    }
}
