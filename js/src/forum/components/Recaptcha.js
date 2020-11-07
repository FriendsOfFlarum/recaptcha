import Component from 'flarum/Component';

export default class Recaptcha extends Component {
    oninit(vnode) {
        super.oninit(vnode);
        this.data = {
            sitekey: app.data['fof-recaptcha.credentials.site'],
            type: app.data['fof-recaptcha.type'],
            theme: app.forum.attribute('darkMode') ? 'dark' : 'light',
        };
    }

    view() {
        return (
            <div className="Form-group">
                <div className="g-recaptcha" oncreate={this.configRecaptcha.bind(this)}/>
            </div>
        );
    }

    configRecaptcha(vnode) {
        this.widgetId = grecaptcha.render(vnode.dom, {
            sitekey: this.data.sitekey,
            theme: this.data.theme,
            type: this.data.type,
            callback: this.attrs.callback,
            size: this.attrs.size,
            'expired-callback': this.attrs.expiredCallback,
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
