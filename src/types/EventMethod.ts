export const EVENT_METHODS = [
  'loadProgress',
  'playProgress',
  'play',
  'pause',
  'finish',
  'seek',
  'ready',
  'sharePanelOpened',
  'downloadClicked',
  'buyClicked',
  'error',
] as const;

export type EventMethod = typeof EVENT_METHODS[number];
