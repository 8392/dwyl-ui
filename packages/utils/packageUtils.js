export const useImageUrl = (name) => {
  /**
   * @method vite动态引入图片
   */
  return new URL(`../assets/${name}`, import.meta.url).href
}
