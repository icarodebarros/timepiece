import { useEffect, useRef, useState } from 'react';

import styles from './Timer.module.scss';

export default function Timer() {
  const hourRef = useRef<HTMLInputElement | null>(null);
  const minRef = useRef<HTMLInputElement | null>(null);
  const secRef = useRef<HTMLInputElement | null>(null);

  const [time, setTime] = useState(0); // time in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isTimeValid, setIsTimeValid] = useState(false);
  const [showTimeIsOver, setShowTimeIsOver] = useState<boolean | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timer | undefined;
    if (isRunning) {
      if (!time) {
        let timeInput = +(secRef.current?.value || 0);
        timeInput += +(minRef.current?.value || 0) * 60;
        timeInput += +(hourRef.current?.value || 0) * 3600;
        if (timeInput) {
          setTime(timeInput);
        } else {
          setShowTimeIsOver(true);
          stopTimer();
        }
      } else {
        // clearInterval(interval);
        interval = setInterval(() => setTime((curTime) => curTime - 1), 1000);
      }
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, time]);

  const stopTimer = () => {
    setTime(0);
    setIsRunning(false);
    setIsTimeValid(false);
  };

  const onChangeTimeInput = () => {
    const sum =
      +(hourRef.current?.value || 0) +
      +(minRef.current?.value || 0) +
      +(secRef.current?.value || 0);
    setIsTimeValid(sum > 0);

    if (sum > 0) {
      clearTimeIsOverMessage();
    }
  };

  const clearTimeIsOverMessage = () => {
    if (showTimeIsOver) {
      setTimeout(() => setShowTimeIsOver(false), 500);
    }
  };

  return (
    <div className="timer-container">
      {!time ? (
        <div className={styles.setTimer}>
          <div>
            <label htmlFor="hr">h</label>
            <input
              type="number"
              id="hr"
              ref={hourRef}
              placeholder="00"
              min="0"
              max="99"
              onChange={onChangeTimeInput}
            />
          </div>
          <div>
            <label htmlFor="min">m</label>
            <input
              type="number"
              id="min"
              ref={minRef}
              placeholder="00"
              min="0"
              max="99"
              onChange={onChangeTimeInput}
            />
          </div>
          <div>
            <label htmlFor="sec">s</label>
            <input
              type="number"
              id="sec"
              ref={secRef}
              placeholder="00"
              min="0"
              max="99"
              onChange={onChangeTimeInput}
            />
          </div>
        </div>
      ) : (
        <h1 className={styles.display}>
          <span>{('0' + Math.floor(time / 3600)).slice(-2)}:</span>
          <span>{('0' + Math.floor((time / 60) % 60)).slice(-2)}:</span>
          <span>{('0' + (time % 60)).slice(-2)}</span>
        </h1>
      )}

      <div
        className={`${styles.messageContainer} ${
          showTimeIsOver !== null
            ? !!showTimeIsOver
              ? styles.notEmpty
              : styles.empty
            : ''
        }`}
      >
        {showTimeIsOver && (
          <div
            className={`${styles.message} ${isTimeValid ? styles.msgHide : ''}`}
          >
            The time is over!
          </div>
        )}
      </div>

      <div className="actions">
        <button
          onClick={() => setIsRunning((curValue) => !curValue)}
          className={isRunning ? 'pause anm-right' : 'play'}
          disabled={!isTimeValid}
        ></button>
        {!!time && (
          <button onClick={stopTimer} className="stop anm-left"></button>
        )}
      </div>
    </div>
  );
}
