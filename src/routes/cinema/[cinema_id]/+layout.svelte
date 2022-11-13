<script>
	import Banner from '$lib/components/Banner.svelte';
	import { ypos, window_width } from '$lib/store.js';
	export let data;
</script>

<svelte:window bind:scrollY={$ypos} bind:innerWidth={$window_width} />

<Banner cinemas={data.cinemas} />
<slot />
