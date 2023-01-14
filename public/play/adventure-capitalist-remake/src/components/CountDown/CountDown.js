import React, { useEffect, useState, useRef } from 'react';

// Time in milisecond
export function CountDown({timeTaken, timeAlreadyRun, onComplete = () => {}, autoStart, uuid}) {
  const [timeLeft, setTimeLeft] = useState(timeTaken - timeAlreadyRun);
  const intervalRef = useRef();
  useEffect(() => {
    setTimeLeft(timeTaken - timeAlreadyRun);
    if (!autoStart) {
      return;
    }
    const startTime = (new Date()).getTime();
    const endTime = startTime + timeTaken - Number(timeAlreadyRun);

    intervalRef.current = setInterval(() => {
      const currentTime = (new Date()).getTime();
      if (endTime > currentTime) {
        setTimeLeft(endTime - currentTime);
      } else {
        clearInterval(intervalRef.current);
        onComplete();
      }
    }, 10);

    return () => {
      clearInterval(intervalRef.current);
    }
  // eslint-disable-next-line
  }, [uuid, autoStart]);

  return (
    <div className="count-down-timer">
      {formatTime(timeLeft)}
    </div>
  );
}

const formatTime = (timeLeft) => {
  let secondsLeft = Math.ceil(timeLeft/1000);
  const hours = Math.floor(secondsLeft / 3600);
  secondsLeft %= 3600;
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  return String(hours).padStart(2, '0') + ':' +
    String(minutes).padStart(2, '0') + ':' +
    String(seconds).padStart(2, '0');
}
