import { Fragment, useEffect, useState } from 'react';

export default function StopWatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [cycles, setCycles] = useState<number[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timer | undefined;
    if (isRunning) {
      clearInterval(interval);
      interval = setInterval(() => setTime((curTime) => curTime + 10), 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const onFlagStopClick = () => {
    if (!isRunning) {
      // stop button
      setTime(0);
      setCycles([]);
    } else {
      // flag button
      setCycles((list) => [...list, time]);
    }
  };

  const getTimeDisplay = (time: number) => {
    return (
      <Fragment>
        <span>{('0' + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{('0' + Math.floor((time / 1000) % 60)).slice(-2)}.</span>
        <span>{('0' + ((time / 10) % 100)).slice(-2)}</span>
      </Fragment>
    );
  };

  return (
    <div className="stopwatch-container">
      <h1>{getTimeDisplay(time)}</h1>

      <ul className="cycles">
        {cycles.map((cycle: number) => (
          <li key={cycle.toString()}>{getTimeDisplay(cycle)}</li>
        ))}
      </ul>

      <div className="actions">
        <button
          onClick={() => setIsRunning((curValue) => !curValue)}
          className={isRunning ? 'pause' : 'play'}
        ></button>
        {!!time && (
          <button
            onClick={onFlagStopClick}
            className={isRunning && time ? 'flag' : 'stop'}
          ></button>
        )}
      </div>
    </div>
  );
}
