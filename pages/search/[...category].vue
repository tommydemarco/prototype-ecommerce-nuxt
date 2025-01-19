<template>
  <SearchGrid
    :isLoading="
      searchResultsStatus === 'idle' || searchResultsStatus === 'pending'
    "
    :searchResults="searchResults || []"
  >
    <template #categories>
      <FilterItems
        filterTitle="Categories"
        :isLoading="isCategoriesLoading"
        :filterItems="
          categories
            ? [
                { name: 'All', path: '' },
                ...categories?.map((category) => ({
                  name: category.name,
                  path: category.slug,
                })),
              ]
            : [{ name: 'All', path: '' }]
        "
      />
    </template>
    <template #sortParams>
      <FilterItems filterTitle="Sort by" :filterItems="sortingParams" />
    </template>
  </SearchGrid>
</template>

<script lang="ts" setup>
import type { Category } from "~/types";

const categories = useState<Category[] | null>("search-categories", () => null);
const isCategoriesLoading = useState<boolean>(
  "search-isCategoriesLoading",
  () => true
);

onMounted(() => {
  if (!categories.value) {
    const fetchCategories = async () => {
      try {
        isCategoriesLoading.value = true;
        const response = await $fetch("/api/categories");
        categories.value = response;
      } catch (error) {
        throw createError({ statusCode: 405, fatal: true });
      } finally {
        isCategoriesLoading.value = false;
      }
    };

    fetchCategories();
  }
});

const route = useRoute();

const queryParams = computed(() => ({
  category: (route.params.category || "") as string,
  maxPrice: (route.query["max-price"] || "") as string,
  sortByPrice: (route.query["sort"] || "") as string,
  searchText: (route.query["q"] || "") as string,
}));

const { data: searchResults, status: searchResultsStatus } = useAsyncData(
  "searchResults",
  async () => {
    const query = new URLSearchParams(queryParams.value).toString();
    try {
      const response = await $fetch(`/api/products?${query}`);
      console.log("CSR: Fetching products data");
      return response;
    } catch {
      return [];
    }
  },
  { watch: [queryParams], server: false }
);

onBeforeRouteLeave((to, from) => {
  if (from.path.startsWith("/search") && !to.path.startsWith("/search")) {
    categories.value = null;
  }
});

useHead({
  title: `Search products | ${appName}`,
  meta: [
    {
      name: "description",
      content: appDescription,
    },
  ],
});
</script>
