<template>
  <div :class="[$style.container, className]">
    <div v-if="content" v-html="content"></div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
interface HtmlContentProps {
  content?: string;
  children?: any;
  className?: string;
}

defineProps<HtmlContentProps>();
</script>

<style module>
.container {
  width: var(--content-width);
  max-width: var(--max-content-width-restricted);
  margin: 0 auto;
}

.container h1 {
  margin-bottom: 2rem;
}

.container h2,
.container p {
  margin-bottom: 1rem;
}
</style>
