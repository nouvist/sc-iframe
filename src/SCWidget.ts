import { LoadOptions, LOAD_OPTIONS_MAPPING } from './LoadOptions';

export default class SCWidget {
  iframe: HTMLIFrameElement;

  constructor(iframe?: HTMLIFrameElement, public invokeTimeout = 1e3) {
    if (typeof iframe !== 'undefined') {
      if (iframe.nodeName.toLocaleLowerCase() !== 'iframe') {
        throw new TypeError('specified element is not an iframe');
      }
      this.iframe = iframe;
    } else {
      this.iframe = document.createElement('iframe');
      this.iframe.setAttribute('frameborder', 'no');
      this.iframe.setAttribute('allow', 'autoplay');
      this.iframe.setAttribute('scrolling', 'no');
      this.iframe.style.minHeight = '166px';
      this.iframe.style.width = '100%';
    }
    this.iframe.id = `scw-${Array.from(Array(8), () =>
      Math.round(Math.random() * 255).toString(16),
    ).join('')}`;
  }

  loadFromURI = (url: string, opts?: Partial<LoadOptions>) => {
    const query = Object.entries({ ...opts, url })
      .map(
        ([key, value]) =>
          `${encodeURIComponent(
            LOAD_OPTIONS_MAPPING[key as keyof LoadOptions] || key,
          )}=${encodeURIComponent(value)}`,
      )
      .join('&');
    this.iframe.src = `https://w.soundcloud.com/player/?${query}`;
  };

  togglePlay = async () => {
    if (await this.isPaused) {
      this.play();
    } else {
      this.pause();
    }
  };

  play = () => {
    this._invoke('play');
  };

  pause = () => {
    this._invoke('pause');
  };

  setVolume = (value: number) => {
    this._invoke(
      'setVolume',
      Math.round(Math.min(1, Math.max(0, value)) * 100),
    );
  };

  getVolume = async () => {
    return (await this._invokeWait<number>('getVolume')) / 100;
  };

  setCurrentTime = (value: number) => {
    this._invoke('seekTo', value);
  };

  getCurrentTime = () => {
    return this._invokeWait<number>('getPosition');
  };

  getSounds = () => {
    return this._invokeWait<number>('getSounds');
  };

  get duration() {
    return this._invokeWait<number>('getDuration');
  }

  get isPaused() {
    return this._invokeWait<boolean>('isPaused');
  }

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

  protected _addEventListener = (method: Method) => {
    this._invoke('addEventListener', method);
  };

  protected _removeEventListener = (method: Method) => {
    this._invoke('removeEventListener', method);
  };
}

type Method =
  | 'loadProgress'
  | 'playProgress'
  | 'play'
  | 'pause'
  | 'finish'
  | 'seek'
  | 'ready'
  | 'sharePanelOpened'
  | 'downloadClicked'
  | 'buyClicked'
  | 'error';
