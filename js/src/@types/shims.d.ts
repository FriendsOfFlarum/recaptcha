export * from 'flarum/forum/ForumApplication';

declare module 'flarum/forum/ForumApplication' {
  export default interface ForumApplication {
    recaptchaLoaded: boolean;
  }
}
