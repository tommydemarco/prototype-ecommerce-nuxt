<template>
  <div :class="$style.container">
    <div :class="$style.leftColumn">
      <ProductCard
        :class="$style.mainHighlighted"
        layoutType="rectangular"
        :product="mainHighlighted"
        :priorityImage="true"
      />
    </div>
    <div :class="$style.rightColumn">
      <ProductCard
        v-for="(product, index) in secondaryHighlighted"
        :key="product.name"
        layoutType="rectangular"
        :product="product"
        :priorityImage="index === 0 ? true : false"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Product } from "@/types";

interface HightlightedHeroProps {
  mainHighlighted: Product;
  secondaryHighlighted: Product[];
}

defineProps<HightlightedHeroProps>();
</script>

<style module>
.container {
  width: var(--content-width);
  max-width: var(--max-content-width);
  margin: 0 auto;
  display: flex;
  gap: 20px;
}

.leftColumn {
  width: 76%;
  position: relative;
}

.rightColumn {
  width: 24%;
  flex-shrink: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

@media (min-width: 1800px) {
  .leftColumn {
    width: 69%;
  }

  .rightColumn {
    width: 31%;
  }
}

@media (min-width: 768px) {
  .mainHighlighted.mainHighlighted {
    aspect-ratio: initial !important;
    width: 100%;
    max-height: 100%;
    height: 100%;
    top: 0;
    position: absolute;
    align-items: stretch;
    justify-content: start;
  }

  .mainHighlighted.mainHighlighted > *:first-child {
    overflow: hidden;
    height: 100%;
    flex: 1;
  }
}

@media (max-width: 1199px) {
  .leftColumn {
    width: 69%;
  }

  .rightColumn {
    width: 31%;
  }
}

@media (max-width: 991px) {
  .leftColumn {
    width: 64%;
  }

  .rightColumn {
    width: 36%;
  }
}

@media (max-width: 767px) {
  .container {
    flex-direction: column;
  }

  .leftColumn {
    width: 100%;
  }

  .rightColumn {
    width: 100%;
  }
}
</style>
