<template>
  <div>
    <ProductDetails :product="productData?.product!" />
    <RelatedSlider
      title="Suggested products"
      :products="productData?.suggestedProducts!"
    />
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const slug = route.params.slug as string;

const { data: productData } = await useFetch(`/api/product-details`, {
  server: true,
  query: {
    slug: slug,
  },
});

//https://nuxt.com/docs/getting-started/error-handling#createerror
if (!productData?.value?.product) {
  throw createError({
    statusCode: 404,
    fatal: true,
  });
}

useHead({
  title: `${productData.value.product.name} | ${appName}`,
  meta: [
    {
      name: "description",
      content: productData.value.product.description,
    },
  ],
});
</script>
