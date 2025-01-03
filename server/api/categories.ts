import { H3Event } from "h3";
import { fetchProductCategories } from "@/server/utils/fetchProductCategories";
import { withMongoClient } from "@/server/utils/withMongoClient";

export default defineEventHandler(async (event: H3Event) => {
  try {
    if (getMethod(event) !== "GET") {
      return sendError(
        event,
        createError({ statusCode: 405, message: "Method not allowed" })
      );
    }

    const categories = await withMongoClient(async (client) => {
      return await fetchProductCategories(client);
    });

    setResponseHeader(event, "Cache-Control", "no-store");
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return sendError(
      event,
      createError({ statusCode: 500, message: "Internal Server Error" })
    );
  }
});
