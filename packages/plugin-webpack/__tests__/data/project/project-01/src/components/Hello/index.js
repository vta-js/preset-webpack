import styles from "./index.modules.less";

export default function Hello(rende) {
  rende(`<h2 class="${styles.hello}">Hello Wepack</h2>`);
}
