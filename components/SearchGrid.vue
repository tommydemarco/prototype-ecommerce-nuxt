<template>
  <div :class="$style.container">
    <div :class="$style.categoriesColumn">
      <slot name="categories" />
    </div>
    <div :class="$style.productsColumn">
      <div v-if="querySearchParam">
        Displaying search results for: <strong>{{ querySearchParam }}</strong>
      </div>
      <div v-if="maxPriceSearchParam">
        Displaying products with a maximum price of
        <strong>${{ maxPriceSearchParam }}</strong>
      </div>
      <div :class="$style.productsContainer">
        <SkeletonLoader
          v-if="isLoading"
          v-for="n in 6"
          :key="n"
          :width="1"
          :height="1"
        />
        <template v-else-if="searchResults.length > 0">
          <ProductCard
            v-for="(product, index) in searchResults"
            :key="product.product_id"
            layoutType="square"
            :product="product"
            :priorityImage="index === 0"
          />
        </template>
        <div v-else>
          Your search
          <template v-if="querySearchParam">
            for <strong>{{ querySearchParam }}</strong>
          </template>
          <template v-if="maxPriceSearchParam">
            with a price limit of <strong>${{ maxPriceSearchParam }}</strong>
          </template>
          did not yield any results.
        </div>
      </div>
    </div>
    <div :class="$style.sortColumn">
      <slot name="sortParams" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Product } from "@/types";

interface SearchGridProps {
  searchResults: Product[];
  isLoading: boolean;
}

const { searchResults, isLoading } = defineProps<SearchGridProps>();

const route = useRoute();
const querySearchParam = computed(() => route.query.q);
const maxPriceSearchParam = computed(() => route.query["max-price"]);
</script>

<style module>
/* Paste your CSS styles from SearchGrid.module.css here */
</style>
