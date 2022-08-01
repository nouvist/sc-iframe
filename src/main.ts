import SCWidget from './SCWidget';

const app = document.getElementById('app')!;

const play = document.createElement('button');
play.textContent = 'play';
app.appendChild(play);

const pause = document.createElement('button');
pause.textContent = 'pause';
app.appendChild(pause);

const sc = new SCWidget();
app.appendChild(sc.iframe);
sc.loadFromURI(
  'https://soundcloud.com/dabootlegboy/sarcastic-sounds-haunt-me',
  {
    showArtwork: false,
  },
);
play.onclick = sc.play;
pause.onclick = sc.pause;

(window as any).sc = sc;
