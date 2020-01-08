export default function normalizeExtension(extension: string, prefixDot = true) {
  const ext = extension.replace(/^\.+/g, "").toLowerCase();
  return prefixDot ? `.${ext}` : ext;
}
