import { useBase } from "@vta/config";

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

export default useBase<PathsConfig>(({ src }) => ({
  entry: `${src}/index.js`,
  public: ["public"],
  html: "public/index.html",
  theme: "theme",
  lessPaths: ["node_modules"],
  babel: {
    include: [src],
    exclude: [],
  },
}));
