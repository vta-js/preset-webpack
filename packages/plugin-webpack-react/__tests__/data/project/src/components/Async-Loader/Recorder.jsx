import React from "react";
import delay from "../../utils/delay";
import "./index.css";

export default function Recorder() {
  const [loaded, setLoaded] = React.useState(false);

  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => {
    let tmpIdx = 0;
    const interval = setInterval(() => {
      setIdx((tmpIdx += 1));
    }, 1000);
    delay().then(() => {
      setLoaded(true);
      clearInterval(interval);
    });
  }, []);

  return loaded ? "Loaded" : idx.toString();
}
