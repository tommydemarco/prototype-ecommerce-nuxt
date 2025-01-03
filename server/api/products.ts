import { H3Event } from "h3";
import { fetchProducts } from "@/server/utils/fetchProducts";
import { withMongoClient } from "@/server/utils/withMongoClient";

export default defineEventHandler(async (event: H3Event) => {
  try {
    if (getMethod(event) !== "GET") {
      return sendError(
        event,
        createError({ statusCode: 405, message: "Method not allowed" })
      );
    }

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
    console.error("Error fetching products:", error);
    return sendError(
      event,
      createError({ statusCode: 500, message: "Internal Server Error" })
    );
  }
});
