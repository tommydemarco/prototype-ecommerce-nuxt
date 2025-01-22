<template>
  <div>
    <HightlightedHero
      :mainHighlighted="featuredProductsData?.highlightedProducts[0]"
      :secondaryHighlighted="[
        featuredProductsData?.highlightedProducts[1],
        featuredProductsData?.highlightedProducts[2],
      ]"
    />
    <FeaturedSlider :products="featuredProductsData?.featuredProducts" />
  </div>
</template>

<script setup>
const { data: featuredProductsData } = await useFetch(
  `/api/featured-products`,
  { server: true }
);

useHead({
  title: appName,
  meta: [
    {
      name: "description",
      content: appDescription,
    },
  ],
});
</script>
