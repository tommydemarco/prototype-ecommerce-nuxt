export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const url = query.url as string;
    const pageData = await withMongoClient(async (client) => {
      return await fetchStaticPageData(client, url!);
    });

    return pageData;
  } catch (error) {
    return sendError(
      event,
      createError({ statusCode: 500, message: "Internal Server Error" })
    );
  }
});
