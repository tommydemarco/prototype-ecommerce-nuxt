<template>
  <div :class="$style.container">
    <div :class="$style.slider" ref="sliderRef">
      <ProductCard
        v-for="product in products"
        :key="product.name"
        :layoutType="'rectangular'"
        :product="product"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Product } from "@/types";

interface FeaturedSliderProps {
  products: Product[];
}

defineProps<FeaturedSliderProps>();

const sliderRef = ref<HTMLDivElement | null>(null);
const intervalRef = ref<number | null>(null);
const isHoveredRef = ref(false);

onMounted(() => {
  const slider = sliderRef.value;
  if (!slider) return;

  let scrollDirection = 1;
  const speed = 2;
  const intervalDuration = 50;

  const animateScroll = () => {
    if (!isHoveredRef.value) {
      if (slider.scrollLeft + slider.offsetWidth >= slider.scrollWidth) {
        scrollDirection = -1;
      } else if (slider.scrollLeft <= 0) {
        scrollDirection = 1;
      }

      slider.scrollLeft += scrollDirection * speed;
    }
  };

  intervalRef.value = window.setInterval(animateScroll, intervalDuration);

  const stopAnimation = () => {
    isHoveredRef.value = true;
  };
  const startAnimation = () => {
    isHoveredRef.value = false;
  };

  slider.addEventListener("mouseenter", stopAnimation);
  slider.addEventListener("mouseleave", startAnimation);

  onBeforeUnmount(() => {
    if (intervalRef.value !== null) {
      clearInterval(intervalRef.value);
    }
    slider.removeEventListener("mouseenter", stopAnimation);
    slider.removeEventListener("mouseleave", startAnimation);
  });
});
</script>

<style module>
.container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 100%;
  margin: 20px auto;
  overflow: hidden;
}

.slider {
  overflow-x: scroll;
  display: flex;
  flex-wrap: nowrap;
  gap: 20px;
  scroll-behavior: smooth;
}

.slider > * {
  min-width: 28vw;
  aspect-ratio: 4/2.5 !important;
}

@media (max-width: 1199px) {
  .slider > * {
    min-width: 38vw;
    aspect-ratio: 4/2.8 !important;
  }
}

@media (max-width: 991px) {
  .slider > * {
    min-width: 48vw;
    aspect-ratio: 4/3 !important;
  }
}

@media (max-width: 767px) {
  .slider > * {
    min-width: 58vw;
    aspect-ratio: 4/3.1 !important;
  }
}
</style>
