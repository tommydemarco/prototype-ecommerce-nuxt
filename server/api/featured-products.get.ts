export default defineEventHandler(async (event) => {
  try {
    const featuredProductsData = await withMongoClient(async (client) => {
      return await fetchFeaturedProducts(client);
    });

    const highlightedProducts = featuredProductsData.slice(0, 3);
    const featuredProducts = featuredProductsData.slice(3);

    setResponseHeader(event, "Cache-Control", "no-store");
    return { highlightedProducts, featuredProducts };
  } catch (error) {
    return sendError(
      event,
      createError({ statusCode: 500, message: "Internal Server Error" })
    );
  }
});
