import url from "url";
import address from "address";

export default function prepareUrls(protocol, host, port): { local: string; lan?: string } {
  const formatUrl = hostname =>
    url.format({
      protocol,
      hostname,
      port,
      pathname: "/",
    });

  const isUnspecifiedHost = host === "0.0.0.0" || host === "::";
  if (isUnspecifiedHost) {
    return { local: formatUrl("localhost"), lan: formatUrl(address.ip()) };
  }
  return { local: formatUrl(host) };
}
