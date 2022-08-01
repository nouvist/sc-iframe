export default class SCWidget {
  iframe: HTMLIFrameElement;

  constructor(iframe?: HTMLIFrameElement) {
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

  protected _invoke = (method: string, value?: any) => {
    const data = JSON.stringify({ method, value: value || null });
    const origin = (
      this.iframe.getAttribute('src')?.split('?')[0] ||
      'https://w.soundcloud.com'
    ).replace(/http:\/\/(w|wt).soundcloud.com/, 'https://$1.soundcloud.com');

    this.iframe.contentWindow?.postMessage(data, origin);
  };

  play = () => {
    this._invoke('play');
  };

  pause = () => {
    this._invoke('pause');
  };

  set volume(value: number) {
    this._invoke(
      'setVolume',
      Math.round(Math.min(1, Math.max(0, value)) * 100),
    );
  }

  set currentTime(value: number) {
    this._invoke('seekTo', value);
  }
}

const LOAD_OPTIONS_MAPPING = {
  autoPlay: 'auto_play',
  color: 'color',
  buying: 'buying',
  sharing: 'sharing',
  download: 'download',
  showArtwork: 'show_artwork',
  showPlayCount: 'show_playcount',
  showUser: 'show_user',
  startTrack: 'start_track',
  singleActive: 'single_active',
};

interface LoadOptions {
  autoPlay: boolean;
  color: string;
  buying: boolean;
  sharing: boolean;
  download: boolean;
  showArtwork: boolean;
  showPlayCount: boolean;
  showUser: boolean;
  startTrack: number;
  singleActive: boolean;
}
