export interface LoadOptions {
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

export const LOAD_OPTIONS_MAPPING = {
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
