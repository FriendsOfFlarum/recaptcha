import app from 'flarum/forum/app';
import DiscussionComposer from 'flarum/forum/components/DiscussionComposer';
import ReplyComposer from 'flarum/forum/components/ReplyComposer';
import extendSignUp from './extendSignUp';
import extendComposer from './extendComposer';
import addRecaptchaToLogin from './addRecaptchaToLogin';
import addRecaptchaToForgotPassword from './addRecaptchaToForgotPassword';

app.initializers.add('fof/recaptcha', () => {
  app.recaptchaLoaded = false;

  extendSignUp();
  extendComposer(DiscussionComposer);
  extendComposer(ReplyComposer);
  addRecaptchaToLogin();
  addRecaptchaToForgotPassword();
});
