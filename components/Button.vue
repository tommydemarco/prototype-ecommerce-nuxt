<template>
  <button
    :aria-label="ariaLabel"
    :class="
      [
        $style.button,
        primary ? $style.primaryButton : $style.secondaryButton,
        className,
      ]
        .filter(Boolean)
        .join(' ')
    "
    @click="onClick"
  >
    <slot />
    <template v-if="badge && badge > 0">
      <span :class="$style.badge">{{ badge }}</span>
    </template>
  </button>
</template>

<script setup lang="ts">
interface ButtonProps {
  onClick?: () => void;
  primary: boolean;
  className?: string;
  badge?: number;
  ariaLabel?: string;
}

defineProps<ButtonProps>();
</script>

<style module>
.button {
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
