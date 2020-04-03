import { useBase, useDeps } from "@vta/config";
import type { ExtensionsConfig } from "./extensions.config";

export declare interface PathsConfig {
  entry?: string;
  src?: string;
  build?: string;
  public?: string[];
  html?: string;
  theme?: string;
  lessPaths?: string[];
  babel: { include: string[]; exclude: string[] };
}

export default useDeps<ExtensionsConfig>("extensions", (extensions) =>
  useBase<PathsConfig>(({ src }) => ({
    entry: `${src}/index.${extensions.entry}`,
    public: ["public"],
    html: "public/index.html",
    theme: "theme",
    lessPaths: ["node_modules"],
    babel: {
      include: [src],
      exclude: [],
    },
  })),
);
