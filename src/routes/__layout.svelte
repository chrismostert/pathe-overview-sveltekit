<script context="module">
	export async function load({ fetch }) {
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
	import OptionBanner from '$lib/components/OptionBanner.svelte';
	export let cinemas;
</script>

<div class="max-w-4xl mx-auto">
	<OptionBanner {cinemas} />
	<main>
		<slot />
	</main>
</div>
