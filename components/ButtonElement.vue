<template>
  <button
    :aria-label="ariaLabel"
    :class="[
      $style.buttonElement,
      primary ? $style.primaryButton : $style.secondaryButton,
      className,
    ]"
    @click="onClick"
  >
    <slot />
    <span v-if="badge && badge > 0" :class="$style.badge">{{ badge }}</span>
  </button>
</template>

<script lang="ts" setup>
interface ButtonElementProps {
  ariaLabel?: string;
  onClick?: () => void;
  primary: boolean;
  className?: string;
  children?: any;
  badge?: number;
}

defineProps<ButtonElementProps>();
</script>

<style module>
.buttonElement {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.primaryButton {
  background-color: var(--color-light-1);
  color: var(--color-dark-1);
}

.primaryButton:hover {
  background-color: var(--color-light-2);
}

.secondaryButton {
  background-color: transparent;
  color: var(--color-light-1);
  border: 1px solid var(--color-light-1);
}

.secondaryButton:hover {
  color: var(--color-light-2);
  border-color: var(--color-light-2);
}

.badge {
  position: absolute;
  top: -11px;
  right: -11px;
  background-color: #c0392b;
  color: var(--color-light-1);
  font-size: 0.75rem;
  font-weight: bold;
  padding: 0.25rem 0.5rem;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: badge-pop 0.3s ease-in-out;
}

@keyframes badge-pop {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
