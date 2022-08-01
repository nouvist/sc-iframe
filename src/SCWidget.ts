import Invoker from './Invoker';
import { LoadOptions, LOAD_OPTIONS_MAPPING } from './types/LoadOptions';
import { EventMethod, EventObject } from './types/Method';

export interface ConstructOptions {
  iframe: HTMLIFrameElement;
  invokeTimeout: number;
  useDefaultStyle: boolean;
}

export default class SCWidget extends Invoker {
  invokeTimeout: number;
  iframe: HTMLIFrameElement;

  constructor({
    iframe,
    invokeTimeout,
    useDefaultStyle,
  }: Partial<ConstructOptions> = {}) {
    super();

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
      if (useDefaultStyle) {
        this.iframe.style.minHeight = '166px';
        this.iframe.style.width = '100%';
      }
    }

    this.invokeTimeout = invokeTimeout || 1e3;
    window.addEventListener('message', this._onMessage);
  }

  protected _onMessage = (evt: MessageEvent) => {
    const data = this._assertMessageEvent<EventObject>(evt);

    if (data === null) return;
    console.log(data);

    switch (data.method as EventMethod) {
      case 'ready': {
        this._addEventListener('play');
        this._addEventListener('pause');
        this._addEventListener('seek');
        this._addEventListener('finish');
        break;
      }

      case 'finish': {
        this.isPaused = true;
        break;
      }

      case 'seek': {
        this._refreshData(data.value);
        break;
      }
      case 'play': {
        this.isPaused = false;
        this._refreshData(data.value);
        break;
      }
      case 'pause': {
        this.isPaused = true;
        this._refreshData(data.value);
        break;
      }
    }
  };

  isPaused = true;
  duration = 0;

  protected _currentTime = 0;
  protected _currentTimeLast = 0;

  get currentTime() {
    if (this.isPaused) return this._currentTime;
    return this._currentTime + Date.now() - this._currentTimeLast;
  }

  set currentTime(value) {
    this._invoke('seekTo', value);
  }

  protected _refreshData = (data: EventObject) => {
    this._currentTimeLast = Date.now();
    this._currentTime = data.currentPosition;
  };

  loadFromURI = (url: string, opts?: Partial<LoadOptions>) => {
    this.isPaused = true;
    this.duration = 0;
    this._currentTime = 0;
    this._currentTimeLast = 0;

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

  play = () => {
    this._invoke('play');
  };

  pause = () => {
    this._invoke('pause');
  };
}
