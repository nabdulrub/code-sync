export default function extractIdFromUrl(url: string) {
  const pathnameSegments = url.split("/");
  return pathnameSegments[pathnameSegments.length - 1];
}
