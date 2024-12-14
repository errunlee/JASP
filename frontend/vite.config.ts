import path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src')
		}
	},
	plugins: [
		VitePWA({
			registerType: 'autoUpdate', // Automatically updates the service worker when new content is available
			includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'], // Include these assets in the build
			manifest: {
				name: 'Trashformers',
				short_name: 'Trashformers',
				description: 'Trashformer Application for your daily use',
				theme_color: '#ffffff',
				icons: [
					{
						src: 'https://img.freepik.com/free-photo/beautiful-selective-focus-shot-crystal-ball-reflecting-breathtaking-sunset_181624-8579.jpg',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkvfNv3Xs6BDaS4MnRbJFsFXxELnDulelLsQ&s',
						sizes: '512x512',
						type: 'image/png'
					},
					{
						src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVH87PJq7z_wioUIbU7KyCzbcHIAVQ1jMOug&s',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any maskable'
					}
				]
			}
		})
	]
});
