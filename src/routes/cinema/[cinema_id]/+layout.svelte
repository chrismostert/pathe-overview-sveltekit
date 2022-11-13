<script>
	import Banner from '$lib/components/Banner.svelte';
	import { ypos, window_width } from '$lib/store.js';
	export let data;
	let y;

	$: $ypos = y;
</script>

<svelte:window bind:scrollY={y} bind:innerWidth={$window_width} />

<Banner cinemas={data.cinemas} />
<slot />
