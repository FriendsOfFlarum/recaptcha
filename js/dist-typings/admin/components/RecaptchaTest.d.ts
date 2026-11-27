import type Mithril from 'mithril';
import Component, { ComponentAttrs } from 'flarum/common/Component';
import { AlertAttrs } from 'flarum/common/components/Alert';
import RecaptchaState from '../../common/states/RecaptchaState';
interface RecaptchaTestAttrs extends ComponentAttrs {
    settings?: Record<string, string>;
}
export default class RecaptchaTest extends Component<RecaptchaTestAttrs, RecaptchaState | null> {
    state: RecaptchaState | null;
    loading: boolean;
    alertAttrs: AlertAttrs | null;
    view(): Mithril.Children;
    reset(): void;
    initialize(): void;
    onsubmit(e: Event): Promise<void>;
    onerror(error: unknown): void;
}
export {};
