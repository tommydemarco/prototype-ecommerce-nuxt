<template>
  <div :class="$style.cotainer">
    <HeaderElement />
    <main :class="$style.main">
      <slot />
    </main>
    <CartDrawer />
    <BackdropLayer />
    <FooterElement />
  </div>
</template>

<style module>
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.main {
  flex: 1;
  padding: 2rem 0rem;
}
</style>
