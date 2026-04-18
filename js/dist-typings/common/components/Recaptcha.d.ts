import type Mithril from 'mithril';
import Component, { ComponentAttrs } from 'flarum/common/Component';
import RecaptchaState from '../states/RecaptchaState';
interface RecaptchaAttrs extends ComponentAttrs {
    state: RecaptchaState;
}
export default class Recaptcha extends Component<RecaptchaAttrs> {
    view(): Mithril.Children;
    oncreate(vnode: Mithril.VnodeDOM<RecaptchaAttrs, this>): void;
}
export {};
