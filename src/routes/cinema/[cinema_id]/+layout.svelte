<script>
	import Banner from '$lib/components/Banner.svelte';
	import { ypos } from '$lib/store.js';
	export let data;
	let y;

	$: $ypos = y;
</script>

<svelte:window bind:scrollY={y} />

<Banner cinemas={data.cinemas} />
<slot />
