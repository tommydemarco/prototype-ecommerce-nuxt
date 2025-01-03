// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  devServer: {
    port: 4000,
  },
  modules: ["@nuxt/image"],
  runtimeConfig: {
    mongodbURI: process.env.MONGODB_URI,
  },
});
