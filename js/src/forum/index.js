import app from 'flarum/forum/app';
import DiscussionComposer from 'flarum/forum/components/DiscussionComposer';
import ReplyComposer from 'flarum/forum/components/ReplyComposer';
import extendSignUp from './extendSignUp';
import extendComposer from './extendComposer';

app.initializers.add('fof/recaptcha', () => {
  app.recaptchaLoaded = false;

  extendSignUp();
  extendComposer(DiscussionComposer);
  extendComposer(ReplyComposer);
});
