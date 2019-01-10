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
                <div
                    className="g-recaptcha"
                    config={this.configRecaptcha.bind(this)}
                    data-sitekey={this.data.sitekey}
                    data-type={this.data.type}
                    data-theme={this.data.theme}
                />
            </div>
        );
    }

    configRecaptcha($el, isInitialized) {
        if (isInitialized) return;

        this.widgetId = grecaptcha.render($el, {
            sitekey: this.data.sitekey,
            theme: this.data.theme,
            type: this.data.type,
            callback: this.props.verifyCallback,
            size: this.props.size,
            tabindex: this.props.tabindex,
            hl: this.props.hl,
            badge: this.props.badge,
            'expired-callback': this.props.expiredCallback,
        });
    }

    getResponse() {
        return grecaptcha.getResponse(this.widgetId);
    }

    reset() {
        return grecaptcha.reset(this.widgetId);
    }
}
