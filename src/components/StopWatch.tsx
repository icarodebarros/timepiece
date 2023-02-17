import { useState } from 'react';

export default function StopWatch() {
  const [time, setTime] = useState<Date | undefined>();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  return (
    <div className="stopwatch-container">
      <h1>00:00:00</h1>
      <div className="actions">
        <button
          onClick={() => setIsPlaying((curValue) => !curValue)}
          className={isPlaying ? 'pause' : 'play'}
        ></button>
      </div>
    </div>
  );
}
