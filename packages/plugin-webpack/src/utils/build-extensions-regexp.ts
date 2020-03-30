import normalizeExtension from "./normalize-extension";

export default function buildExtensionsRegexp(extensions: string[]): RegExp {
  return new RegExp(
    `\\.(${extensions
      .map((ext) => normalizeExtension(ext, false).replace(/\./g, "\\."))
      .join("|")})$`,
  );
}
