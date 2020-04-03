import React from "react";
import service from "./service";
import "./index.less";

export default function HotMusic() {
  const [name, setName] = React.useState("Loading...");
  React.useEffect(() => {
    service.loadMusic().then((song) => {
      setName(song ? `${song.author}--${song.title}` : "Not Found");
    });
  }, []);
  return (
    <div className="hot-music">
      Hot Music: <span className="hot-music-title">{name}</span>
    </div>
  );
}
