import { useIntersectionObserver } from '@vueuse/core';

export default function useSetAnimationRef(el: any, index: number | string, observed: Set<number | string>, visibleIndices: Set<number | string>) {
  // 如果元素存在，且該索引還沒被監聽過
  if (el && !observed.has(index)) {
    observed.add(index); // 標記為已監聽

    // 針對 Vue 元件獲取其底層 DOM ($el)，若是普通標籤則直接使用 el
    const target = el.$el || el;

    // 4. 開始監聽元素是否進入可視範圍
    useIntersectionObserver(target, ([{ isIntersecting }]) => {
      // 5. 當卡片進入畫面 (isIntersecting 為 true)
      if (isIntersecting) {
        visibleIndices.add(index); // 將索引加入「可見列表」，觸發 CSS 動態類別
      }
    }, { threshold: 0.2 }); // threshold 0.2 表示元素出現 20% 時觸發
  }
};