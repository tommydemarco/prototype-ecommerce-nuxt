<template>
  <NuxtLayout>
    <HtmlContent>
      <h1 v-if="error.statusCode !== 404">An error occurred</h1>
      <h1 v-else>404</h1>
      <p v-if="error.statusCode !== 404">
        Error: Unable to process your request. Please return later.
      </p>
      <p v-else>Page not found</p>
      <div>error</div>
    </HtmlContent>
  </NuxtLayout>
</template>

<script setup lang="ts">
defineProps<{
  error: {
    statusCode: number;
    message: string;
  };
}>();
</script>
