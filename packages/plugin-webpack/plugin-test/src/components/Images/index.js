import webpackImg from "../../assets/webpack.png";
import webpackImgSmall from "../../assets/webpack-small.jpg";
import styles from "./index.modules.css";

export default function Images(rende) {
  rende(`
  <div class="${styles.imgContainer}">
    <div class="${styles.webpackImg}">
      <img src="${webpackImg}" alt='webapck'/>
      <img src="${webpackImgSmall}" alt='webapck-small'/>
    </div>
    <div class='${styles.notFoundImg}'></div>
  </div>
  `);
}
