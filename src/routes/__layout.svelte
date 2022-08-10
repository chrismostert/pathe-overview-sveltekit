<script context="module">
	export async function load({ fetch, params }) {
		let response = await fetch('/api/cinemas');

		if (response.ok) {
			return {
				props: {
					cinemas: (await response.json()).cinemas,
					selected: params.cinema_id ? params.cinema_id : '0'
				}
			};
		}

		return {
			props: {
				cinemas: [],
				selected: '0'
			}
		};
	}
</script>

<script>
	import '../app.css';
	import OptionBanner from '$lib/components/OptionBanner.svelte';
	export let cinemas, selected;
</script>

<div class="mx-auto max-w-4xl">
	<OptionBanner {cinemas} {selected} />
	<main>
		<slot />
	</main>
</div>
