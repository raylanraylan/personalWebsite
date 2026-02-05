export function imgUrl(url: string) {
  return new URL(url, import.meta.url).href
}