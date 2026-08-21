/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "assets/favicon.svg",
        "assets/Kobs DP.webp",
        "assets/hanson-tube.png",
      ],
      manifest: {
        name: "Hanson-Tube | Systems Engineer & Portfolio",
        short_name: "HansonTube",
        description:
          "Immersive interactive portfolio showcasing systems engineering, data science, and venture platforms by Kobby Hanson.",
        theme_color: "#141415",
        background_color: "#141415",
        display: "standalone",
        orientation: "portrait-primary",
        icons: [
          {
            src: "/assets/favicon.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any",
          },
          {
            src: "/assets/hanson-tube.png",
            sizes: "192x192 512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,webp,woff2}"],
        runtimeCaching: [
          {
            urlPattern: /\.(?:webp|png|jpg|jpeg|svg)$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "hanson-tube-images",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
              },
            },
          },
        ],
      },
    }),
  ],
  server: {
    host: "0.0.0.0",
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
  },
});
