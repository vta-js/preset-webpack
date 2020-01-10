import open from "open";

export default function openDirectory(dir: string) {
  open(dir, { wait: false, url: false }).catch(() => undefined);
}
