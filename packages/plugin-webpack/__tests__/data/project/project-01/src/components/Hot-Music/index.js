import service from "./service";
import "./index.less";

export default function HotMusic(rende) {
  rende('<div class="hot-music">Hot Music: <span class="hot-music-title">Loading...</span></div>');

  service.loadMusic().then((song) => {
    document.querySelector(".hot-music-title").innerHTML = song
      ? `${song.author}--${song.title}`
      : "Not Found";
  });
}
