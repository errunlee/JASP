import path from "path";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    VitePWA({
      registerType: "autoUpdate", // Automatically updates the service worker when new content is available
      includeAssets: ["favicon.ico", "robots.txt", "apple-touch-icon.png"], // Include these assets in the build
      manifest: {
        name: "Trashformers",
        short_name: "Trashformers",
        description: "Trashformer Application for your daily use",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/logo.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/logo.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/logo.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
});
