import React from "react";
import Hello from "../components/Hello";
import Images from "../components/Images";
import HotMusic from "../components/Hot-Music";
import TxtDownloader from "../components/Txt-Downloader";
import AsyncLoader from "../components/Async-Loader";

import styles from "./index.modules.less";

export default () => (
  <div className={styles.container}>
    <div className={styles.hello}>
      <Hello />
    </div>
    <div className={styles.images}>
      <Images />
    </div>
    <div className={styles.flex} style={{ padding: "8px 0" }}>
      <div
        className={`${styles.flexNoGrow} ${styles.txtDownloader}`}
        style={{ flexBasis: "150px" }}
      >
        <TxtDownloader />
      </div>
      <div className={`${styles.flexGrow} ${styles.asyncLoader}`}>
        <AsyncLoader />
      </div>
    </div>
    <div className={styles.hotMusic}>
      <HotMusic />
    </div>
  </div>
);
