import Component from 'flarum/Component';

export default class Recaptcha extends Component {
    init() {
        this.data = {
            sitekey: app.data['fof-recaptcha.credentials.site'],
            type: app.data['fof-recaptcha.type'],
            theme: app.forum.attribute('darkMode') ? 'dark' : 'light',
        };
    }

    view() {
        return (
            <div className="Form-group">
                <div className="g-recaptcha" config={this.configRecaptcha.bind(this)} />
            </div>
        );
    }

    configRecaptcha($el, isInitialized) {
        if (isInitialized) return;

        this.widgetId = grecaptcha.render($el, {
            sitekey: this.data.sitekey,
            theme: this.data.theme,
            type: this.data.type,
            callback: this.props.callback,
            size: this.props.size,
            'expired-callback': this.props.expiredCallback,
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
