import Component from 'flarum/common/Component';

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
        this.attrs.state.render(vnode.dom.querySelector('.g-recaptcha'));

        // It's possible to TAB into the reCAPTCHA iframe, and it's very confusing when using the invisible mode
        if (app.data['fof-recaptcha.type'] === 'invisible') {
            const iframe = vnode.dom.querySelector('iframe');

            if (iframe) {
                iframe.tabIndex = -1;
            }
        }
    }
}
