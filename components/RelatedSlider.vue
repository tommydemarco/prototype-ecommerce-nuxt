<template>
  <div :class="$style.container">
    <div :class="$style.title">{{ title }}</div>
    <div :class="$style.slider">
      <ProductCard
        v-for="product in products"
        :key="product.name"
        layoutType="square"
        :product="product"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Product } from "@/types";

interface RelatedSliderProps {
  title: string;
  products: Product[];
}

defineProps<RelatedSliderProps>();
</script>

<style module>
.container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: var(--content-width);
  max-width: var(--max-content-width);
  margin: 40px auto;
  overflow: hidden;
}

.title {
  font-weight: bold;
  font-size: 1.9rem;
}

.slider {
  overflow: scroll;
  display: flex;
  flex-wrap: nowrap;
  gap: 20px;
  padding-bottom: 20px;
}

.slider > * {
  min-width: 300px;
}
</style>
