import { EventMethod } from './types/EventMethod';

export default abstract class Invoker {
  abstract iframe: HTMLIFrameElement;
  abstract invokeTimeout: number;

  protected _invoke = (method: string, value?: any) => {
    const data = JSON.stringify({ method, value: value || null });
    const origin = (
      this.iframe.getAttribute('src')?.split('?')[0] ||
      'https://w.soundcloud.com'
    ).replace(/http:\/\/(w|wt).soundcloud.com/, 'https://$1.soundcloud.com');

    this.iframe.contentWindow?.postMessage(data, origin);
  };

  protected _invokeWait = <T>(method: string, value?: any): Promise<T> => {
    return new Promise((res, rej) => {
      const iframe = this.iframe;
      let timeout: ReturnType<typeof setTimeout>;

      function onMessage(evt: MessageEvent) {
        if (iframe.contentWindow !== evt.source) return;

        let data: { method: string; value: T };
        try {
          data = JSON.parse(evt.data);
        } catch {
          return;
        }

        if (method !== data.method) return;

        clearTimeout(timeout);
        window.removeEventListener('message', onMessage);
        res(data.value);
      }
      window.addEventListener('message', onMessage);
      timeout = setTimeout(() => {
        window.removeEventListener('message', onMessage);
        rej(new Error('iframe is not responding'));
      }, this.invokeTimeout);

      this._invoke(method, value);
    });
  };

  protected _addEventListener = (method: EventMethod) => {
    this._invoke('addEventListener', method);
  };

  protected _removeEventListener = (method: EventMethod) => {
    this._invoke('removeEventListener', method);
  };
}
