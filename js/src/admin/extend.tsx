import app from 'flarum/admin/app';
import Extend from 'flarum/common/extenders';
import extractText from 'flarum/common/utils/extractText';
import RecaptchaPage from './components/RecaptchaPage';

export default [
  new Extend.Admin()
    .page(RecaptchaPage)
    .setting(() => ({
      setting: 'fof-recaptcha.type',
      label: app.translator.trans('fof-recaptcha.admin.settings.type_label'),
      help: app.translator.trans('fof-recaptcha.admin.settings.type_help'),
      options: {
        checkbox: extractText(app.translator.trans('fof-recaptcha.admin.settings.type_options.checkbox')),
        invisible: extractText(app.translator.trans('fof-recaptcha.admin.settings.type_options.invisible')),
        v3: extractText(app.translator.trans('fof-recaptcha.admin.settings.type_options.v3')),
      },
      required: true,
      default: 'checkbox',
      type: 'select',
    }))
    .setting(() => ({
      setting: 'fof-recaptcha.v3_threshold',
      label: app.translator.trans('fof-recaptcha.admin.settings.v3_threshold_label'),
      help: app.translator.trans('fof-recaptcha.admin.settings.v3_threshold_help'),
      type: 'number',
      min: 0,
      max: 1,
      step: 0.1,
      placeholder: '0.5',
    }))
    .setting(() => ({
      setting: 'fof-recaptcha.credentials.site',
      label: app.translator.trans('fof-recaptcha.admin.settings.site_key_label'),
      type: 'text',
      required: true,
      help: app.translator.trans('fof-recaptcha.admin.settings.help_text', {
        a: <a href="https://www.google.com/recaptcha/admin" target="_blank" rel="noopener" />,
      }),
    }))
    .setting(() => ({
      setting: 'fof-recaptcha.credentials.secret',
      label: app.translator.trans('fof-recaptcha.admin.settings.secret_key_label'),
      type: 'password',
      required: true,
    }))
    .setting(() => ({
      setting: 'fof-recaptcha.signup',
      type: 'bool',
      label: app.translator.trans('fof-recaptcha.admin.settings.signup'),
    }))
    .setting(() => ({
      setting: 'fof-recaptcha.signin',
      type: 'bool',
      label: app.translator.trans('fof-recaptcha.admin.settings.signin'),
    }))
    .setting(() => ({
      setting: 'fof-recaptcha.forgot',
      type: 'bool',
      label: app.translator.trans('fof-recaptcha.admin.settings.forgot'),
    }))
    .permission(
      () => ({
        permission: 'fof-recaptcha.postWithoutCaptcha',
        label: app.translator.trans('fof-recaptcha.admin.permissions.post_without_captcha'),
        icon: 'fas fa-robot',
      }),
      'reply'
    ),
];
