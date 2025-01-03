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

const { data: products } = await useAsyncData("products", async () => {
  const { MongoClient } = await import("mongodb");

  const uri = process.env.MONGODB_URI as string;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("e-commerce");
    const collection = db.collection("products");
    return await collection.find({}).limit(10).toArray();
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  } finally {
    await client.close();
  }
});

// const product = data.value?.product;
// const suggestedProducts = data.value?.suggestedProducts;
</script>
