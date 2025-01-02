import { useState, useEffect } from "react";

const secondsTable = [
  ["year", 60 * 60 * 24 * 365],
  ["month", 60 * 60 * 24 * 30],
  ["week", 60 * 60 * 24 * 7],
  ["day", 60 * 60 * 24],
  ["hour", 60 * 60],
  ["minute", 60],
];
const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });

function getTimeAgo(date) {
  const seconds = Math.round((date.getTime() - new Date().getTime()) / 1000);
  const absSeconds = Math.abs(seconds);
  let bestUnit, bestTime, bestInterval;
  for (let [unit, unitSeconds] of secondsTable) {
    if (absSeconds >= unitSeconds) {
      bestUnit = unit;
      bestTime = Math.round(seconds / unitSeconds);
      bestInterval = Math.min(unitSeconds / 2, 60 * 60 * 24);
      break;
    }
  }
  if (!bestUnit) {
    bestUnit = "second";
    bestTime = parseInt(seconds / 10) * 10;
    bestInterval = 10;
  }
  return [bestTime, bestUnit, bestInterval];
}

export default function TimeAgo({ isoDate }) {
  const date = new Date(Date.parse(isoDate));
  const [time, unit, interval] = getTimeAgo(date);
  const [, setUpdate] = useState(0);
  

  useEffect(() => {
    const timerId = setInterval(
      () => setUpdate(update => update + 1),
      interval * 1000
    );
    return () => clearInterval(timerId);
  }, [interval]);

  return <span title={date.toString()}>{rtf.format(time, unit)}</span>;
}

/*Let's assume the initial render happens 10 minutes and 20 seconds after the time passed to isoDate. The component rounds this down and renders "10 minutes ago". 
Since this is the first render, the side effect function runs and starts an interval timer that forces a re-render every 30 seconds.
30 seconds later, the value of isoDate is now 10 minutes and 50 seconds ago. 
The component re-renders as "11 minutes ago". 
The interval is still 30 seconds, so the side effect does not run this time.
Another 30 seconds pass, and isoDate is now 11 minutes and 20 seconds ago. 
The component renders "11 minutes ago" again and the side effect function does not run.
The interval timer continues to run every 30 seconds, updating the rendered text as necessary, and without running the side effect function.
After approximately 50 minutes of refreshes every 30 seconds, the component's re-render will render itself as "1 hour ago". 
The value of the interval variable in this run of the component's render function is going to be 1800, which is equivalent to 30 minutes. 
In all previous renders, interval was 30, so this time the value has changed. Since this value is a dependency of the side effect function, React calls the cleanup function set during the initial render, which destroys the 30-second timer, and then launches the side effect function a second time. 
The side effect function now starts a new 30-minute interval timer.
From now on the component re-renders every 30 minutes. 
If the application is left running long enough, eventually the interval will change to half a day, at which point the side effect function will run again to start an updated interval timer.*/
