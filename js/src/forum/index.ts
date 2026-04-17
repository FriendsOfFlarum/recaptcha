import app from 'flarum/forum/app';
import extendComposer from './extendComposer';
import extendAuthModals from './extendAuthModals';

app.initializers.add('fof/recaptcha', () => {
  app.recaptchaLoaded = false;

  extendComposer(DiscussionComposer);
  extendComposer(ReplyComposer);
  extendAuthModals();
});
