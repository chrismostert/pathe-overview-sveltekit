/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'2D': '#D8DBE2',
				'3D': '#FFC426',
				special: '#188FA7'
			}
		}
	},
	plugins: []
};
