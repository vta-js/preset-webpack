import React from "react";
import txt from "./hello.txt";
import styles from "./index.modules.less";

export default function TxtDownloader() {
  return (
    <div className={styles["txt-downloader"]}>
      <a href={txt} target="_blank" rel="noopener noreferrer">
        download txt
      </a>
    </div>
  );
}
