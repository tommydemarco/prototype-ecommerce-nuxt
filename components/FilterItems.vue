<template>
  <div :class="$style.container">
    <div :class="$style.filterTitle">{{ props.filterTitle }}</div>
    <ul :class="$style.desktopList">
      <li v-if="props.isLoading" v-for="number in [1, 2, 3, 4]" :key="number">
        <SkeletonLoader :height="20" />
      </li>
      <li
        v-else
        v-for="item in props.filterItems"
        :key="item.name"
        :class="{
          [$style.activeItem]: activeItem?.name === item.name,
        }"
      >
        <NavigationLink
          :href="buildHref(route.path, currentParams.value as any, item)"
        >
          {{ item.name }}
        </NavigationLink>
      </li>
    </ul>
    <select
      :class="$style.mobileSelect"
      @change="handleSelectChange"
      :title="props.filterTitle"
      :disabled="props.isLoading"
      :value="
        props.isLoading ? 'loading' : activeItem?.name || 'select-category'
      "
    >
      <option v-if="props.isLoading" disabled value="loading">
        Categories are loading...
      </option>
      <option v-else value="select-category" disabled>Select a category</option>
      <option
        v-for="item in props.filterItems"
        :key="item.name"
        :value="item.name"
      >
        {{ item.name }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
type FilterItem = {
  name: string;
  path?: string;
  query?: { [key: string]: string | undefined };
};

type FilterItemsProps = {
  filterTitle: string;
  filterItems: FilterItem[];
  isLoading?: boolean;
};

const props = defineProps<FilterItemsProps>();
const router = useRouter();
const route = useRoute();

const currentParams = computed(() => ({ ...route.query }));

const buildHref = (
  basePath: string | null,
  currentParams: Record<string, string>,
  filterItem: FilterItem
) => {
  const resolvedPathname =
    filterItem.path !== undefined
      ? filterItem.path
        ? `/search/${filterItem.path}`
        : "/search"
      : basePath;

  const query = filterItem.query
    ? Object.fromEntries(
        Object.entries({
          ...currentParams,
          ...filterItem.query,
        }).filter(([_, value]) => value !== undefined)
      )
    : Object.fromEntries(
        Object.entries(currentParams).filter(
          ([key]) => key !== "max-price" && key !== "q"
        )
      );

  return { path: resolvedPathname!, query };
};

const isActiveItem = (
  filterItem: FilterItem,
  pathname: string | null,
  currentParams: Record<string, string>
) => {
  const pathnameFilter = pathname?.split("/")[2];

  if (filterItem.path !== undefined) {
    return (
      filterItem.path === pathnameFilter ||
      (filterItem.path === "" &&
        pathnameFilter === undefined &&
        !currentParams["max-price"] &&
        !currentParams["q"])
    );
  }

  if (filterItem.query) {
    return Object.entries(filterItem.query).every(
      ([key, value]) => currentParams[key] === value
    );
  }

  return false;
};

const activeItem = computed(() =>
  props.filterItems.find((item) =>
    isActiveItem(
      item,
      route.path,
      currentParams.value as Record<string, string>
    )
  )
);

const handleSelectChange = (event: Event) => {
  const selectedItem = props.filterItems.find(
    (item) => item.name === (event.target as HTMLSelectElement).value
  );

  if (selectedItem) {
    const { path: resolvedPathname, query } = buildHref(
      route.path,
      currentParams.value as Record<string, string>,
      selectedItem
    );
    router.push({ path: resolvedPathname!, query });
  }
};
</script>

<style module>
.container {
  display: flex;
  flex-direction: column;
}

.activeItem a {
  text-decoration: underline;
}

.filterTitle {
  margin-bottom: 0.7rem;
  font-size: 0.9rem;
  color: var(--color-light-2);
  font-weight: bold;
}

.desktopList {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.mobileSelect {
  display: none;
  padding: 0.5rem;
  background-color: var(--color-dark-1);
  color: var(--color-light-2);
  border: 1px solid var(--color-light-1);
  border-radius: 0.25rem;
}

@media (max-width: 991px) {
  .desktopList {
    display: none;
  }

  .mobileSelect {
    display: block;
  }
}
</style>
