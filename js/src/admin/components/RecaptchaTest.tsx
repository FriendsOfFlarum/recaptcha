import type Mithril from 'mithril';
import app from 'flarum/admin/app';

import Component, { ComponentAttrs } from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';
import Alert, { AlertAttrs } from 'flarum/common/components/Alert';
import classList from 'flarum/common/utils/classList';
import RecaptchaState from '../../common/states/RecaptchaState';
import Recaptcha from '../../common/components/Recaptcha';

interface RecaptchaTestAttrs extends ComponentAttrs {
  settings?: Record<string, string>;
}

const TEST_ACTION = 'test';

export default class RecaptchaTest extends Component<RecaptchaTestAttrs, RecaptchaState | null> {
  state: RecaptchaState | null = null;
  loading = false;
  alertAttrs: AlertAttrs | null = null;

  view(): Mithril.Children {
    return (
      <div className="RecaptchaPage-recaptcha">
        <div className="ExtensionPage-permissions-header">
          <div className="container">
            <h2 className="ExtensionTitle">{app.translator.trans('fof-recaptcha.admin.test.title')}</h2>
          </div>
        </div>
        <div className="container">
          <form onsubmit={this.onsubmit.bind(this)} className={classList('FoFReCaptchaTestForm', this.state?.isInvisible() && 'isInvisible')}>
            <div className="Form-group Form-group--recaptcha">
              <p className="helpText">{app.translator.trans('fof-recaptcha.admin.test.help_text')}</p>

              {this.alertAttrs && <Alert {...this.alertAttrs} dismissible={false} />}

              {this.state && <Recaptcha state={this.state} />}
            </div>

            <div className="Form-group">
              <div className="ButtonGroup">
                <Button className="Button Button--primary" type="submit" loading={this.loading}>
                  {app.translator.trans(`fof-recaptcha.admin.test.${this.state ? 'submit' : 'load_test'}_button`)}
                </Button>

                {this.state && (
                  <Button className="Button" onclick={this.initialize.bind(this)}>
                    {app.translator.trans('fof-recaptcha.admin.test.reload_button')}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }

  reset(): void {
    this.state = null;
    this.alertAttrs = null;
    this.loading = false;

    m.redraw.sync();
  }

  initialize(): void {
    this.reset();

    const data = this.attrs.settings ?? (app.data.settings as unknown as Record<string, string>);

    this.state = new RecaptchaState(data, TEST_ACTION, () => {}, this.onerror.bind(this));
  }

  async onsubmit(e: Event): Promise<void> {
    e.preventDefault();

    if (!this.state) {
      return this.initialize();
    }

    this.alertAttrs = null;
    this.loading = true;
    m.redraw();

    let token: string;

    try {
      token = this.state.requiresAsyncToken() ? await this.state.acquireToken() : this.state.getResponse();
    } catch (error) {
      return this.onerror(error);
    }

    try {
      await app.request({
        method: 'POST',
        url: `${app.forum.attribute('apiUrl')}/fof/recaptcha/test`,
        body: {
          'g-recaptcha-response': token,
          'g-recaptcha-action': this.state.action,
        },
        errorHandler: () => {},
      });
    } catch (error) {
      return this.onerror(error);
    }

    this.loading = false;
    this.alertAttrs = {
      type: 'success',
      content: app.translator.trans('fof-recaptcha.admin.test.success_message'),
    };
    this.state.reset();
    m.redraw();
  }

  onerror(error: unknown): void {
    const alert = (error as { alert?: AlertAttrs })?.alert ?? (error as AlertAttrs);

    this.loading = false;
    this.alertAttrs = alert;
    this.state?.reset();
    m.redraw();
  }
}
