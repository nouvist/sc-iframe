import Invoker from './Invoker';
import { LoadOptions, LOAD_OPTIONS_MAPPING } from './types/LoadOptions';

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
}
