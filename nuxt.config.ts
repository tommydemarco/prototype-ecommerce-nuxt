// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  devServer: {
    port: 4000,
  },
  modules: ["@nuxt/image"],
  image: {
    format: ["webp"],
  },
  runtimeConfig: {
    mongodbURI: process.env.MONGODB_URI,
  },
  routeRules: {
    "/": { prerender: true },
    "/about": { prerender: true },
    "/cookie-policy": { prerender: true },
    "/frequently-asked-questions": { prerender: true },
    "/privacy-policy": { prerender: true },
    "/terms-and-conditions": { prerender: true },
  },
});
