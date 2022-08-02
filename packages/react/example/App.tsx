import { useEffect, useRef } from 'react';
import { Widget } from 'soundcloud-embed';
import { SCWidget } from '../src';

function format(time: number) {
  const round = Math.round(time / 1e3);
  const sec = round % 60;
  const min = (round - sec) / 60;
  return `${min.toString().padStart(3, '0')}:${sec
    .toString()
    .padStart(2, '0')}`;
}

function App() {
  const widget = useRef<Widget>(null);

  useEffect(() => {
    console.log(widget);
    if (!widget.current) return;
    const interval = setInterval(() => {
      console.log(
        `${format(widget.current?.currentTime || 0)} / ${format(
          widget.current?.duration || 0,
        )}`,
      );
    }, 500);
    return () => clearInterval(interval);
  }, [widget]);

  return (
    <SCWidget
      useDefaultStyle
      ref={widget}
      loadOnStart={{
        uri: 'https://soundcloud.com/rufi-o/would-you-love-me-with-my-demons-ft-mishaal',
      }}
    />
  );
}

export default App;
