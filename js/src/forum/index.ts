import app from 'flarum/forum/app';
import extendComposer from './extendComposer';
import extendAuthModals from './extendAuthModals';

export { default as extend } from './extend';

app.initializers.add('fof/recaptcha', () => {
  extendComposer('flarum/forum/components/DiscussionComposer', 'start_discussion');
  extendComposer('flarum/forum/components/ReplyComposer', 'reply_post');
  extendAuthModals();
});
