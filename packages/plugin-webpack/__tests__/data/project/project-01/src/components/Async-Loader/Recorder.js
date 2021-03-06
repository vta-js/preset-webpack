import delay from "../../utils/delay";
import "./index.css";

export default async function Recorder(rende) {
  let idx = 0;
  const interval = setInterval(() => {
    rende((idx += 1));
  }, 1000);

  await delay();
  clearInterval(interval);
  rende("Loaded");
}
