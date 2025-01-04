<template>
  <div :class="[$style.skeletonLoader, className]">
    <div :class="$style.aspectWrapper" :style="computedStyle">
      <div :class="$style.content"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface SkeletonLoaderProps {
  width?: number;
  height: number;
  className?: string;
}

const props = defineProps<SkeletonLoaderProps>();

const computedStyle = computed(() => {
  if (props.width !== undefined) {
    return {
      paddingBottom: `${(props.height / props.width) * 100}%`,
      width: "100%",
    };
  } else {
    return {
      height: `${props.height}px`,
      width: "100%",
    };
  }
});
</script>

<style module>
.skeletonLoader {
  position: relative;
  display: block;
  overflow: hidden;
  background-color: var(--color-dark-2);
  width: 100%;
  border-radius: var(--border-radius);
}

.aspectWrapper {
  position: relative;
  width: 100%;
}

.content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color-dark-2);
  overflow: hidden;
}

.content::before {
  content: "";
  display: block;
  width: 200%;
  height: 100%;
  background: linear-gradient(
    to right,
    var(--color-dark-2) 0%,
    var(--color-dark-1) 50%,
    var(--color-dark-2) 100%
  );
  position: absolute;
  top: 0;
  left: -100%;
  animation: shimmer 1.5s infinite linear;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>
