import app from 'flarum/forum/app';
import DiscussionComposer from 'flarum/forum/components/DiscussionComposer';
import ReplyComposer from 'flarum/forum/components/ReplyComposer';
import extendComposer from './extendComposer';
import extendAuthModals from './extendAuthModals';

app.initializers.add('fof/recaptcha', () => {
  app.recaptchaLoaded = false;

  extendComposer(DiscussionComposer);
  extendComposer(ReplyComposer);
  extendAuthModals();
});
