const version = '/api/v0';

export function VersionURL(url: string) {
  if (url.startsWith('/')) {
    return `${version}${url}`;
  }
  return `${version}/${url}`;
}
