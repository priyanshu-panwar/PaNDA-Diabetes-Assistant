import React, { useState } from "react";

export default function Clock() {
  let time = new Date().toLocaleTimeString();
  const [ctime, setCtime] = useState(time);

  const updateTime = () => {
    time = new Date().toLocaleTimeString();
    setCtime(time);
  };
  setInterval(updateTime, 1000);
  let t = ctime.toString();
  let hr = t.slice(0, 2);
  let min = t.slice(3, 5);
  // if (min < 10) {
  //   min = "0" + min;
  // }
  let ampm = "am";
  if (hr > 12) {
    hr -= 12;
    ampm = "pm";
  }
  return (
    <>
      <h3>
        <strong>
          {hr} : {min} {ampm}
        </strong>
      </h3>
    </>
  );
}
