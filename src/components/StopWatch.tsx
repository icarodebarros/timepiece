import { Fragment, useEffect, useState } from 'react';

import styles from './StopWatch.module.scss';

export default function StopWatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [cycles, setCycles] = useState<number[]>([]);
  const [showBtnAnimation, setShowBtnAnimation] = useState<boolean>(false);

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
      setShowBtnAnimation(true);
      setCycles((list) => [time, ...list]);
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

      <ul
        className={`${styles.cycles} ${
          showBtnAnimation ? (cycles.length ? styles.notEmpty : styles.empty) : ''
        }`}
      >
        {cycles.map((cycle: number, i: number) => (
          <li key={cycle.toString()}>
            <div className={styles.cycleData}>
              <span className={styles.auxInfo}>
                <img src="/flag-3-svgrepo-com.svg" alt="flag icon"></img>
                {' ' + ('0' + (cycles.length - i)).slice(-2)}
              </span>
              <span className={styles.auxInfo}>
                + {getTimeDisplay(cycle - (cycles[i + 1] | 0))}
              </span>
              <span>{getTimeDisplay(cycle)}</span>
            </div>
          </li>
        ))}
      </ul>

      <div className="actions">
        <button
          onClick={() => setIsRunning((curValue) => !curValue)}
          className={isRunning ? 'pause anm-right' : 'play'}
        ></button>
        {!!time && (
          <button
            onClick={onFlagStopClick}
            className={isRunning && time ? 'flag anm-left' : 'stop'}
          ></button>
        )}
      </div>
    </div>
  );
}
