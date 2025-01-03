<template>
  <Head>
    <!-- <title>{{ product.name }} | {{ appName }}</title>
    <meta name="description" :content="product.description" /> -->
  </Head>

  <!-- <ProductDetails :product="product" />
  <RelatedSlider title="Suggested products" :products="suggestedProducts" /> -->
</template>

<script lang="ts" setup>
const route = useRoute();
const slug = route.params.slug as string;

// const product = data.value?.product;
// const suggestedProducts = data.value?.suggestedProducts;
</script>
