import React, { useState, useEffect, useCallback } from "react";

interface Props {
  endDate: string;
}

const TimerDisplay: React.FC<Props> = ({ endDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const calculateTimeLeft = useCallback(() => {
    const endDateTime = new Date(endDate);
    const difference = endDateTime.getTime() - new Date().getTime();

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      setTimeLeft({ days, hours, minutes, seconds });
    } else {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    }
  }, [endDate]);

  useEffect(() => {
    const interval = setInterval(() => {
      calculateTimeLeft();
    }, 1000);
    return () => clearInterval(interval);
  }, [calculateTimeLeft]);

  let timerString = "";
  if (timeLeft.days >= 30) {
    timerString = `${timeLeft.days}d`;
  } else if (timeLeft.days === 0 && timeLeft.hours===0&& timeLeft.days===0&& timeLeft.seconds===0){
    timerString = "00:00:00"
  }else if (timeLeft.days < 7) {
    timerString = `${timeLeft.days}d -${timeLeft.hours < 10 ? `0${timeLeft.hours}`:timeLeft.hours}:${timeLeft.minutes < 10 ? `0${timeLeft.minutes}`:timeLeft.minutes}:${timeLeft.seconds < 10 ? `0${timeLeft.seconds}`:timeLeft.seconds}`;
  }

  return <div className={`p-3 bg-gray-50 rounded ${timeLeft.days < 7  ? 'text-red-500' : ''}`}>{timerString}</div>;
};

export default TimerDisplay;
