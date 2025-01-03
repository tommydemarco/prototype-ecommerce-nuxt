export default defineEventHandler(async (event) => {
  try {
    const categories = await withMongoClient(async (client) => {
      return await fetchProductCategories(client);
    });

    setResponseHeader(event, "Cache-Control", "no-store");
    return categories;
  } catch (error) {
    return sendError(
      event,
      createError({ statusCode: 500, message: "Internal Server Error" })
    );
  }
});
