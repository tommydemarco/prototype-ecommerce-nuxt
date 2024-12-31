<template>
  <div
    @click="closeCart"
    :class="[$style.backdropLayer, isCartOpen ? $style.open : $style.closed]"
  ></div>
</template>

<script lang="ts" setup>
const { isCartOpen, setIsCartOpen } = useCart();

const closeCart = () => {
  setIsCartOpen(false);
};
</script>

<style module>
.backdropLayer {
  z-index: 1;
  position: fixed;
  background-color: transparent;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  pointer-events: none;
  transition: background-color 0.3s ease;
}

.backdropLayer.open {
  background-color: rgba(0, 0, 0, 0.365);
  width: 100%;
  height: 100%;
  pointer-events: auto;
}
</style>
