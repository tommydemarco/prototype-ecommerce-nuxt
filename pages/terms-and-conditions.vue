<template>
  <HtmlContent :content="pageData?.content" />
</template>

<script lang="ts" setup>
const { data: pageData } = await useFetch(`/api/static-page-data`, {
  server: true,
  query: {
    url: "terms-and-conditions",
  },
});

useHead({
  title: `${pageData?.value?.title} | ${appName}`,
  meta: [{ name: "description", content: pageData.value?.description || "" }],
});
</script>
