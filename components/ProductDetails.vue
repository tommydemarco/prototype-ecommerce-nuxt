<template>
  <div :class="$style.container">
    <div :class="$style.leftColumn">
      <div :class="$style.imageContainer">
        <NuxtImg
          :src="productImages[currentImageIndex]"
          :alt="product.name"
          width="550"
          height="550"
          :class="$style.mainImage"
          loading="eager"
          preload
        />
        <div :class="$style.controls">
          <button
            aria-label="previous image"
            :class="$style.arrow"
            @click="handlePrevImage"
          >
            &lt;
          </button>
          <button
            aria-label="next image"
            :class="$style.arrow"
            @click="handleNextImage"
          >
            &gt;
          </button>
        </div>
      </div>
      <div :class="$style.thumbnails">
        <div
          v-for="(image, index) in productImages"
          :key="index"
          :class="[
            $style.thumbnailContainer,
            { [$style.activeThumbnail]: index === currentImageIndex },
          ]"
          @click="currentImageIndex = index"
        >
          <nuxt-img
            :src="image"
            :alt="`Thumbnail ${index + 1}`"
            width="80"
            height="80"
            :class="$style.thumbnail"
          />
        </div>
      </div>
    </div>
    <div :class="$style.rightColumn">
      <h1 :class="$style.title">{{ product.name }}</h1>
      <HtmlContent :class="$style.description" :content="product.description" />
      <p :class="$style.price">${{ product.price.toFixed(2) }}</p>
      <div v-if="product.stock_quantity > 0">
        <ButtonElement primary @click="addToCart" :class="$style.addToCart">
          Add to Cart
        </ButtonElement>
      </div>
      <p v-else>This item is currently out of stock</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Product } from "@/types";

interface ProductDetailsProps {
  product: Product;
}

const { product } = defineProps<ProductDetailsProps>();

const { addProductToCart, setIsCartOpen } = useCart();
const currentImageIndex = ref(0);

const productImages = [
  "/images/garden-trowel-1.webp",
  "/images/garden-trowel-2.webp",
  "/images/garden-trowel-3.webp",
];

function handlePrevImage() {
  currentImageIndex.value =
    currentImageIndex.value === 0
      ? productImages.length - 1
      : currentImageIndex.value - 1;
}

function handleNextImage() {
  currentImageIndex.value =
    currentImageIndex.value === productImages.length - 1
      ? 0
      : currentImageIndex.value + 1;
}

function addToCart() {
  addProductToCart(product);
  setIsCartOpen(true);
}
</script>

<style module>
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  width: var(--content-width);
  max-width: var(--max-content-width);
  margin: 0 auto;
}

.leftColumn {
  flex: 1;
  width: 100%;
  max-width: 550px;
  margin: 0 auto;
}

.rightColumn {
  flex: 1;
  min-width: 300px;
}

.description.description {
  width: 100%;
}

.imageContainer {
  position: relative;
  border-radius: 8px;
  border: 2px solid var(--color-dark-2);
}

.mainImage {
  width: 100%;
  height: auto;
  border-radius: 8px;
  background-color: var(--color-dark-1);
}

.controls {
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: -20px;
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
}

.arrow {
  background: var(--color-dark-1);
  color: var(--color-light-1);
  border: 2px solid var(--color-dark-2);
  padding: 15px 20px;
  font-weight: bold;
  cursor: pointer;
  border-radius: var(--border-radius);
}

.thumbnails {
  display: flex;
  justify-content: center;
  margin-top: 15px;
  gap: 10px;
}

.thumbnailContainer {
  width: 80px;
  height: 80px;
  cursor: pointer;
  border: 2px solid var(--color-dark-2);
  border-radius: 4px;
  overflow: hidden;
}

.thumbnail {
  width: 100%;
  height: auto;
  border-radius: 1px;
}

.activeThumbnail {
  border-color: var(--color-primary);
}

.title {
  font-size: 2.2rem;
  color: var(--color-light-1);
  margin-bottom: 1.5rem;
}

.price {
  font-size: 1.5rem;
  color: var(--color-light-1);
  font-weight: bold;
}

.quantity {
  font-size: 1rem;
  color: var(--color-light-2);
}

.addToCart.addToCart {
  margin-top: 20px;
  min-width: 200px;
  padding: 12px;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }

  .controls {
    padding: 0;
  }

  .thumbnailContainer {
    width: 60px;
    height: 60px;
  }
}
</style>
