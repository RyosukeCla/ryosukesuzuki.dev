
export function getFullUrl(pathname: string) {
  return new URL(pathname, 'https://ryosukesuzuki.dev').href;
}