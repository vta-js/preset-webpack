import React from "react";
import webpackImg from "../../assets/webpack.png";
import webpackImgSmall from "../../assets/webpack-small.jpg";
import styles from "./index.modules.css";

export default function Images() {
  return (
    <div className={styles.imgContainer}>
      <div className={styles.webpackImg}>
        <img src={webpackImg} alt="webapck" />
        <img src={webpackImgSmall} alt="webapck-small" />
      </div>
      <div className={styles.notFoundImg} />
    </div>
  );
}
