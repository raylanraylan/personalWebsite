import type { Ref } from "vue";

export function imgSize(url: string, variable?: Ref<string>): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      if (variable) {
        variable.value = (img.naturalWidth / img.naturalHeight).toFixed(2);
      }
      resolve();
    };
  });
}