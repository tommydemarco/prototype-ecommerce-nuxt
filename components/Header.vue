<template>
  <div>
    <header :class="$style.header">
      <Button
        :primary="false"
        ariaLabel="Toggle menu"
        :class="$style.burgerMenu"
        @click="isSidebarOpen = true"
      >
        <span>&#9472;</span>
        <span>&#9472;</span>
        <span>&#9472;</span>
      </Button>
      <nav :class="$style.leftSection">
        <NuxtLink to="/" :class="$style.logo">Nuxt</NuxtLink>
        <div :class="$style.navLinks">
          <NavigationLink href="/search">All products</NavigationLink>
          <NavigationLink href="/search?max-price=20">Cheapest</NavigationLink>
        </div>
      </nav>
      <div :class="$style.middleSection">
        <div :class="$style.searchContainer">
          <input
            type="text"
            :class="$style.searchBar"
            placeholder="Search..."
            v-model="searchValue"
          />
          <Button
            :primary="false"
            :class="$style.searchButton"
            @click="handleSearch"
          >
            Go
          </Button>
        </div>
      </div>
      <div :class="$style.rightSection">
        <Button
          :primary="true"
          :badge="itemsInCart"
          @click="setIsCartOpen(true)"
          :class="$style.button"
        >
          Cart
        </Button>
      </div>
    </header>
    <aside
      :aria-hidden="!isSidebarOpen"
      :class="[
        $style.headerSidebar,
        isSidebarOpen ? $style.open : $style.closed,
      ]"
    >
      <div :class="$style.headerSidebarElement">
        <Button
          :primary="false"
          ariaLabel="Close menu"
          :class="$style.closeButton"
          @click="isSidebarOpen = false"
        >
          &times;
        </Button>
        <div :class="$style.title">Menu</div>
      </div>
      <div :class="$style.content">
        <div :class="$style.searchContainer">
          <input
            type="text"
            :class="$style.searchBar"
            placeholder="Search..."
            v-model="searchValue"
          />
          <Button
            :primary="false"
            :class="$style.searchButton"
            @click="
              () => {
                isSidebarOpen = false;
                handleSearch();
              }
            "
          >
            Go
          </Button>
        </div>
        <div :class="$style.sidebarNav">
          <Button
            :primary="false"
            :class="$style.sidebarButton"
            @click="
              () => {
                isSidebarOpen = false;
                router.push({ path: '/search' });
              }
            "
          >
            All products
          </Button>
          <Button
            :primary="false"
            :class="$style.sidebarButton"
            @click="
              () => {
                isSidebarOpen = false;
                router.push({ path: '/search', query: { 'max-price': 20 } });
              }
            "
          >
            Cheapest
          </Button>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import type { CartProduct } from "~/types";

const router = useRouter();
const { cartProducts, setIsCartOpen } = useCart();
const searchValue = ref("");
const isSidebarOpen = ref(false);

const itemsInCart = computed(() =>
  cartProducts.value.reduce(
    (prev: number, next: CartProduct) => prev + next.quantity,
    0
  )
);

const handleSearch = () => {
  router.push({
    path: "/search",
    query: { q: searchValue.value },
  });
  searchValue.value = "";
};
</script>

<style module>
.header {
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.3rem 2rem;
  background-color: var(--color-dark-1);
  border-bottom: 1px solid var(--color-dark-2);
}

.leftSection {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.navLinks {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo {
  margin-bottom: 2px;
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-light-1);
}

.middleSection {
  display: flex;
  align-items: center;
}

.searchBar {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid var(--color-light-2);
  border-radius: var(--border-radius);
  width: 100%;
  max-width: 300px;
}

.rightSection {
  display: flex;
  align-items: center;
}

.searchContainer {
  display: flex;
  align-items: center;
}

.searchButton {
  margin-left: 0.5rem;
}

.burgerMenu {
  display: flex;
  flex-direction: column;
  gap: 3px;
  display: none;
}

.burgerMenu span {
  line-height: 0.25rem;
}

@media (max-width: 767px) {
  .header {
    flex-wrap: wrap;
    align-items: flex-start;
  }

  .middleSection {
    display: none;
  }

  .navLinks {
    display: none;
  }

  .burgerMenu {
    display: flex;
  }
}

.headerSidebar {
  position: fixed;
  top: 0;
  z-index: 2;
  left: -100vw;
  height: 100vh;
  width: 100vw;
  max-width: 100vw;
  background-color: var(--color-dark-1);
  border-left: 1px solid var(--color-dark-2);
  box-shadow: -2px 0 15px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
}

.headerSidebar.open {
  transform: translateX(100vw);
}

.headerSidebar.closed {
  transform: translateX(0);
}

.headerSidebarElement {
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.3rem 2rem;
  font-weight: bold;
  border-bottom: 1px solid var(--color-dark-2);
}

.title {
  margin: 0;
  font-size: 1.3rem;
  color: var(--color-light-1);
}

.closeButton {
  background: none;
  color: var(--color-light-1);
  cursor: pointer;
}

.content {
  flex-grow: 1;
  padding: 1.5rem 2rem;
  overflow-y: auto;
  color: var(--color-light-2);
}

.sidebarNav {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.sidebarButton {
  padding: 0;
  border: 0;
  width: fit-content;
}

.sidebarButton:hover {
  text-decoration: underline;
}
</style>
