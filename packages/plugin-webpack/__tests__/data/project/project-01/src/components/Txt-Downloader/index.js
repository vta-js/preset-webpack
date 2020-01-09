import txt from "./hello.txt";
import styles from "./index.modules.less";

export default function TxtDownloader(rende) {
  rende(
    `<div class="${styles["txt-downloader"]}"><a href="${txt}" target="_blank">download txt</a></div>`,
  );
}
