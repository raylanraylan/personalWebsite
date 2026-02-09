import type { Ref } from "vue";

export function imgAspectRatio(url: string, variable?: Ref<string>): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      if (variable) {
        variable.value = (img.width / img.height).toFixed(2);
      }
      resolve();
    };
  });
}