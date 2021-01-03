import DiscussionComposer from 'flarum/components/DiscussionComposer';
import ReplyComposer from 'flarum/components/ReplyComposer';
import extendSignUp from './extendSignUp';
import extendComposer from './extendComposer';

app.initializers.add('fof/recaptcha', () => {
    extendSignUp();
    extendComposer(DiscussionComposer);
    extendComposer(ReplyComposer);
});
