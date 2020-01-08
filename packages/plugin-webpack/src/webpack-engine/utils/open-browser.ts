import open from "open";

export default function openBrowser(url: string) {
  open(url, { wait: false, url: true }).catch(() => undefined);
}
