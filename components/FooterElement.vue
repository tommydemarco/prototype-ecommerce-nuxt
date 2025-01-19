<template>
  <footer :class="$style.footerElement">
    <div :class="$style.container">
      <div :class="$style.topSection">
        <div :class="$style.logo">Nuxt</div>
        <div :class="$style.links">
          <NavigationLink href="/">Home</NavigationLink>
          <NavigationLink href="/about">About</NavigationLink>
          <NavigationLink href="/terms-and-conditions">
            Terms & Conditions
          </NavigationLink>
          <NavigationLink href="/cookie-policy">Cookie Policy</NavigationLink>
          <NavigationLink href="/privacy-policy">Privacy Policy</NavigationLink>
          <NavigationLink href="/frequently-asked-questions"
            >FAQ</NavigationLink
          >
        </div>
        <ButtonElement
          :primary="false"
          :class="$style.backToTop"
          @click="scrollToTop"
        >
          Back to Top
        </ButtonElement>
      </div>
      <div :class="$style.bottomSection">
        <p>
          This prototype is part of a bachelor thesis project by Tommaso De
          Marco |
          <a
            href="https://github.com/tommydemarco/prototype-ecommerce-next"
            target="_blank"
          >
            View the source code
          </a>
        </p>
        <p>
          The placeholder product images are based on a photo by Sameer Kalani,
          downloaded from Pexels.com
        </p>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
</script>

<style module>
.footerElement {
  background-color: var(--color-dark-1);
  border-top: 1px solid var(--color-dark-2);
  color: var(--color-light-1);
  padding: 3rem 2rem 2rem;
  text-align: center;
}

.container {
  width: 80%;
  max-width: 1200px;
  margin: 0 auto;
}

.topSection {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  border-bottom: 1px solid var(--color-dark-2);
  padding-bottom: 2rem;
  margin-bottom: 1rem;
  gap: 5rem;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

.links {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
}

.backToTop {
  margin-left: auto;
}

.bottomSection {
  line-height: 1.5;
  display: flex;
  gap: 2rem;
  padding-top: 1rem;
  justify-content: space-between;
}

.bottomSection p {
  max-width: 400px;
  text-align: left;
}

@media (max-width: 568px) {
  .topSection {
    flex-direction: column;
    align-items: flex-start;
    gap: 2.5rem;
  }

  .backToTop {
    margin-left: 0;
  }

  .bottomSection {
    flex-direction: column;
  }
}
</style>
