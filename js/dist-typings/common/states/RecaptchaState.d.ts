import type { AlertAttrs } from 'flarum/common/components/Alert';
export type RecaptchaType = 'checkbox' | 'invisible' | 'v3';
type RecaptchaSettings = Record<string, string>;
type SuccessCallback = (response: string) => void;
type ErrorCallback = (alertAttrs: AlertAttrs) => void;
export default class RecaptchaState {
    settings: RecaptchaSettings;
    callback: SuccessCallback;
    errorCallback: ErrorCallback;
    widgetId: number | null;
    type: RecaptchaType;
    action: string;
    constructor(settings: RecaptchaSettings, action: string, callback: SuccessCallback, errorCallback?: ErrorCallback | null);
    get siteKey(): string;
    isInvisible(): boolean;
    isV3(): boolean;
    /**
     * True if acquiring a token requires an async call (v2 invisible, v3).
     * False for v2 checkbox, where the token is already present in the widget once the user has ticked it.
     */
    requiresAsyncToken(): boolean;
    /**
     * v2 only: render the widget into `element`. v3 has no visible widget.
     */
    render(element: HTMLElement): void;
    /**
     * Synchronously read the current widget response. v2 checkbox only — returns the token the user has
     * ticked, or an empty string if they haven't. Not meaningful for v2 invisible or v3.
     */
    getResponse(): string;
    /**
     * Resolve a reCAPTCHA token asynchronously. Needed for:
     * - v2 invisible: triggers `execute()` on the widget and resolves when the callback fires.
     * - v3: calls `grecaptcha.execute(siteKey, { action })` and resolves with the returned token.
     * For v2 checkbox this resolves immediately with whatever the user ticked (may be empty).
     */
    acquireToken(): Promise<string>;
    reset(): void;
    private isDark;
}
export {};
