"use client";

import { useState, useEffect } from "react";

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 3,
    minutes: 33,
    seconds: 3,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          // Reset when reaches 0
          hours = 3;
          minutes = 33;
          seconds = 3;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (num: number) => {
    return num.toString().padStart(2, "0");
  };

  return (
    <div className="countdown-banner">
      <div className="countdown-banner__content">
        <div className="countdown-banner__left">
          <span className="countdown-banner__icon">⏱</span>
          <span className="countdown-banner__text">LIMITED-TIME OFFER</span>
        </div>
        <div className="countdown-banner__timer">
          {formatTime(timeLeft.hours)} : {formatTime(timeLeft.minutes)} :{" "}
          {formatTime(timeLeft.seconds)}
        </div>
      </div>
    </div>
  );
}

