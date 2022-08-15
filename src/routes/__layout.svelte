<script context="module">
	export async function load({ fetch, params }) {
		let response = await fetch('/api/cinemas');

		if (response.ok) {
			return {
				props: {
					cinemas: (await response.json()).cinemas
				}
			};
		}

		return {
			props: {
				cinemas: []
			}
		};
	}
</script>

<script>
	import '../app.css';
	import Banner from '$lib/components/Banner.svelte';
	export let cinemas;
</script>

<div class="mx-auto max-w-4xl">
	<Banner {cinemas} />
	<main>
		<slot />
	</main>
</div>
