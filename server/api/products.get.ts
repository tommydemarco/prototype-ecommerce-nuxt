export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const { category, maxPrice, sortByPrice, searchText } = query;

    const products = await withMongoClient(async (client) => {
      return await fetchProducts(client, {
        category: (category || undefined) as string | undefined,
        maxPrice: maxPrice ? parseFloat(maxPrice as string) : undefined,
        sortByPrice:
          sortByPrice === ""
            ? undefined
            : sortByPrice === "price-asc"
            ? "asc"
            : "desc",
        searchText: (searchText as string) || undefined,
      });
    });

    setResponseHeader(event, "Cache-Control", "no-store");
    return products;
  } catch (error) {
    return sendError(
      event,
      createError({ statusCode: 500, message: "Internal Server Error" })
    );
  }
});
