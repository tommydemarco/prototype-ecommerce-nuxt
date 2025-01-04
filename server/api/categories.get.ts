export default defineEventHandler(async (event) => {
  try {
    const categories = await withMongoClient(async (client) => {
      return await fetchProductCategories(client);
    });

    return categories;
  } catch (error) {
    return sendError(
      event,
      createError({ statusCode: 500, message: "Internal Server Error" })
    );
  }
});
