import type Mithril from 'mithril';
import app from 'flarum/admin/app';

import Component, { ComponentAttrs } from 'flarum/common/Component';
import RecaptchaState from '../../common/states/RecaptchaState';
import Recaptcha from '../../common/components/Recaptcha';
import Button from 'flarum/common/components/Button';
import Alert from 'flarum/common/components/Alert';
import classList from 'flarum/common/utils/classList';

export default class RecaptchaTest extends Component<any, RecaptchaState | null> {
  loading = false;
  alertAttrs: any;

  view(vnode: Mithril.Vnode<ComponentAttrs, this>): Mithril.Children {
    return (
      <div className="RecaptchaPage-recaptcha">
        <div class="ExtensionPage-permissions-header">
          <div class="container">
            <h2 className="ExtensionTitle">{app.translator.trans('fof-recaptcha.admin.test.title')}</h2>
          </div>
        </div>
        <div class="container">
          <form onsubmit={this.onsubmit.bind(this)} className={classList('FoFReCaptchaTestForm', this.state?.isInvisible() && 'isInvisible')}>
            <div class="Form-group Form-group--recaptcha">
              <p class="helpText">{app.translator.trans('fof-recaptcha.admin.test.help_text')}</p>

              {this.alertAttrs && <Alert {...this.alertAttrs} dismissible={false} />}

              {this.state && <Recaptcha state={this.state} />}
            </div>

            <div class="Form-group">
              <div class="ButtonGroup">
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

            <div class="Form-group"></div>
          </form>
        </div>
      </div>
    );
  }

  destroy() {
    this.state = null;
    this.alertAttrs = null;
    this.loading = false;

    m.redraw.sync();
  }

  initialize() {
    this.destroy();

    const data = this.attrs.settings || app.data.settings;

    this.state = new RecaptchaState(
      data,
      () => {
        if (this.state!.isInvisible()) {
          // Create "fake" event so this works when other extensions extend onsubmit as well
          const event = new Event('submit');
          event.isRecaptchaSecondStep = true;
          this.onsubmit(event);
        }
      },
      this.onerror
    );
  }

  async onsubmit(e: Event) {
    e.preventDefault();

    if (!this.state) {
      return this.initialize();
    }

    this.alertAttrs = null;
    this.loading = true;
    m.redraw();

    if (this.state.isInvisible() && !e.isRecaptchaSecondStep) {
      // When recaptcha is invisible, onsubmit will be called two times
      // First time with normal event, we will call recaptcha.execute
      // Second time is called from recaptcha callback with a special isRecaptcha attribute
      e.preventDefault();
      this.state.execute();
      return;
    }

    const body = {
      'g-recaptcha-response': this.state.getResponse(),
    };

    try {
      await app.request({
        method: 'POST',
        url: `${app.forum.attribute('apiUrl')}/fof/recaptcha/test`,
        body,
        errorHandler: () => {},
      });
    } catch (e) {
      return this.onerror(e);
    }

    this.loading = false;
    this.alertAttrs = {
      type: 'success',
      content: app.translator.trans('fof-recaptcha.admin.test.success_message'),
    };
    this.state.reset();
    m.redraw();
  }

  onerror(error) {
    const alert = error.alert || error;

    this.loading = false;
    this.alertAttrs = alert;
    this.state?.reset();
    m.redraw();
  }
}
