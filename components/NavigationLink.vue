<template>
  <NuxtLink :to="href" :class="$style.link">
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
import type {
  RouteLocationAsPathGeneric,
  RouteLocationAsRelativeGeneric,
} from "vue-router";

interface NavigationLinkProps {
  href: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric;
}

defineProps<NavigationLinkProps>();
</script>

<style module>
.navigationLink {
  text-decoration: none;
  color: var(--color-light-2);
  font-size: 1rem;
  text-align: start;
}

.navigationLink:hover {
  text-decoration: underline;
}
</style>
