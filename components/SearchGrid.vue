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
.container {
  width: var(--content-width);
  max-width: var(--max-content-width);
  display: flex;
  margin: 0 auto;
}

.productsColumn {
  display: flex;
  flex-direction: column;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  gap: 1rem;
}

.productsContainer {
  position: relative;
  flex: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

@media (min-width: 992px) {
  .categoriesColumn {
    width: 220px;
    min-width: 220px;
  }

  .productsColumn {
    width: calc(100% - 125px - 220px);
  }

  .sortColumn {
    width: 125px;
    min-width: 125px;
  }
}

.productsContainer > * {
  flex-basis: calc(33.33% - 1rem);
}

@media (max-width: 1299px) {
  .productsContainer > * {
    flex-basis: calc(50% - 1rem);
  }
}

@media (max-width: 640px) {
  .productsContainer > * {
    flex-basis: calc(100%);
  }
}

@media (max-width: 991px) {
  .container {
    flex-direction: column;
    gap: 1.5rem;
  }

  .productsColumn {
    order: 2;
    padding-left: 0;
    padding-right: 0;
  }
}
</style>
