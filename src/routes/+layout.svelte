<script>
	import '../app.css';
	import Banner from '$lib/components/Banner.svelte';
	import { ypos } from '$lib/store.js';
	export let data;
	let y;

	$: $ypos = y;
</script>

<svelte:window bind:scrollY={y} />

<div class="mx-auto max-w-4xl">
	<Banner {data} />
	<main>
		<slot />
	</main>
</div>
