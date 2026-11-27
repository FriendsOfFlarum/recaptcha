declare global {
  interface Window {
    // `grecaptcha` is injected by https://www.recaptcha.net/recaptcha/api.js and may be undefined
    // before the script loads, or partially defined while the API is still initializing.
    grecaptcha?: {
      render?(
        element: HTMLElement,
        parameters: {
          sitekey: string;
          theme?: 'light' | 'dark';
          type?: 'checkbox' | 'invisible' | 'image' | 'audio';
          size?: 'normal' | 'compact' | 'invisible';
          tabindex?: number;
          callback?: (response: string) => void;
          'expired-callback'?: () => void;
          'error-callback'?: () => void;
        }
      ): number;
      getResponse(widgetId?: number): string;
      // v2 signature: execute a widget by id.
      // v3 signature: execute a token request with an action, returning a promise.
      execute(widgetId?: number): void;
      execute(siteKey: string, options: { action: string }): Promise<string>;
      reset(widgetId?: number): void;
    };
  }
}

export {};
