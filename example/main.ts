import SCWidget from '../src';

const app = document.getElementById('app')!;

const play = document.createElement('button');
play.textContent = 'play';
app.appendChild(play);

const pause = document.createElement('button');
pause.textContent = 'pause';
app.appendChild(pause);

const time = document.createElement('i');
time.textContent = '0';
app.appendChild(time);

const sc = new SCWidget({ useDefaultStyle: true });
app.appendChild(sc.iframe);
sc.loadFromURI(
  'https://soundcloud.com/rufi-o/would-you-love-me-with-my-demons-ft-mishaal',
  {
    showArtwork: false,
  },
);
play.onclick = sc.play;
pause.onclick = sc.pause;

function format(time: number) {
  const round = Math.round(time / 1e3);
  const sec = round % 60;
  const min = (round - sec) / 60;
  return `${min.toString().padStart(3, '0')}:${sec
    .toString()
    .padStart(2, '0')}`;
}
setInterval(() => {
  time.textContent = `${format(sc.currentTime)} / ${format(sc.duration)}`;
}, 500);
// window.addEventListener('message', console.log);

(window as any).sc = sc;
