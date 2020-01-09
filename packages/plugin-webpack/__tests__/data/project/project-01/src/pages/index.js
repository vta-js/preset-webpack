import Hello from "../components/Hello";
import Images from "../components/Images";
import HotMusic from "../components/Hot-Music";
import TxtDownloader from "../components/Txt-Downloader";
import AsyncLoader from "../components/Async-Loader";

import styles from "./index.modules.less";

export default function App(rende) {
  rende(`
  <div class="${styles.container}">
    <div class="${styles.hello}"></div>
    <div class="${styles.images}"></div>
    <div class="${styles.flex}" style="padding: 8px 0">
      <div class="${styles.flexNoGrow} ${styles.txtDownloader}" style="flex-basis:150px"></div>
      <div class="${styles.flexGrow} ${styles.asyncLoader}"></div>
    </div>
    <div class="${styles.hotMusic}"></div>
  </div>
  `);

  Hello(html => {
    document.querySelector(`.${styles.hello}`).innerHTML = html;
  });

  Images(html => {
    document.querySelector(`.${styles.images}`).innerHTML = html;
  });
  HotMusic(html => {
    document.querySelector(`.${styles.hotMusic}`).innerHTML = html;
  });
  TxtDownloader(html => {
    document.querySelector(`.${styles.txtDownloader}`).innerHTML = html;
  });
  AsyncLoader(html => {
    document.querySelector(`.${styles.asyncLoader}`).innerHTML = html;
  });
}
