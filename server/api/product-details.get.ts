export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const slug = query.slug as string;
    const productData = await withMongoClient(async (client) => {
      const product = await fetchProduct(client, slug);
      const suggestedProducts = await fetchSuggestedProducts(client, slug);
      console.log("SSR: Fetching product data");
      return { product, suggestedProducts };
    });

    return productData;
  } catch (error) {
    return sendError(
      event,
      createError({ statusCode: 500, message: "Internal Server Error" })
    );
  }
});
