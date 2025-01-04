<template>
  <div :class="[$style.cartDrawer, isCartOpen ? $style.open : $style.closed]">
    <div :class="$style.header">
      <div :class="$style.title">Your cart</div>
      <ButtonElement
        :primary="false"
        ariaLabel="close"
        :class="$style.closeButton"
        @click="closeCart"
      >
        &times;
      </ButtonElement>
    </div>
    <div :class="$style.content">
      <template v-if="cartProducts.length">
        <div :class="$style.productsContainer">
          <CartProduct
            v-for="cartProduct in cartProducts"
            :key="cartProduct.product_id"
            :product="cartProduct"
            :decrementProductFromCart="decrementProductFromCart"
            :removeProductFromCart="removeProductFromCart"
          />
        </div>
        <div :class="$style.cartInfo">
          <div :class="$style.infoItem">
            <span>Taxes</span>
            <span>Calculated at checkout</span>
          </div>
          <div :class="$style.infoItem">
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>
          <div :class="$style.infoItem">
            <span>Total</span>
            <span>${{ cartTotal.toFixed(2) }}</span>
          </div>
          <ButtonElement :primary="true" :class="$style.checkoutButton">
            Proceed to checkout
          </ButtonElement>
        </div>
      </template>
      <template v-else>
        <div :class="$style.productsContainer">Your cart is empty</div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
const {
  cartProducts,
  isCartOpen,
  setIsCartOpen,
  decrementProductFromCart,
  removeProductFromCart,
} = useCart();

const cartTotal = computed(() =>
  cartProducts.value.reduce(
    (prev, next) => prev + next.quantity * next.price,
    0
  )
);

function closeCart() {
  setIsCartOpen(false);
}
</script>

<style module>
.cartDrawer {
  position: fixed;
  top: 0;
  z-index: 2;
  right: -400px;
  height: 100vh;
  width: 400px;
  max-width: 100vw;
  background-color: var(--color-dark-1);
  border-left: 1px solid var(--color-dark-2);
  box-shadow: -2px 0 15px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
}

.cartDrawer.open {
  transform: translateX(-400px);
}

.cartDrawer.closed {
  transform: translateX(0);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.3rem 2rem;
  font-weight: bold;
  height: 80px;
  border-bottom: 1px solid var(--color-dark-2);
}

.title {
  margin: 0;
  font-size: 1.4rem;
  color: var(--color-light-1);
}

.closeButton {
  background: none;
  color: var(--color-light-1);
  cursor: pointer;
}

.content {
  flex-grow: 1;
  padding: 1.5rem 0rem 0rem;
  padding-top: 0.5rem;
  overflow-y: auto;
  color: var(--color-light-2);
  display: flex;
  flex-direction: column;
}

.productsContainer {
  padding: 1rem 2rem;
  flex: 1;
}

.cartInfo {
  position: sticky;
  bottom: 0;
  background-color: var(--color-dark-1);
  padding: 1rem 2rem 2rem;
}

.infoItem {
  display: flex;
  justify-content: space-between;
  padding: 0.8rem 0rem 0.5rem;
  border-bottom: 1px solid var(--color-dark-2);
}

.infoItem:last-of-type {
  margin-bottom: 1.5rem;
}

.checkoutButton.checkoutButton {
  cursor: not-allowed;
  width: 100%;
}

.checkoutButton:hover.checkoutButton:hover {
  background-color: var(--color-light-1);
}
</style>
