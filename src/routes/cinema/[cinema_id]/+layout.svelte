<script>
	import Banner from '$lib/components/Banner.svelte';
	import { ypos, window_width } from '$lib/store.js';
	export let data;
	let selected_cinema;

	$: selected_cinema = data.cinemas.filter((elem) => elem.cinema_id == data.selected_cinema)[0]
		?.cinema_name;
</script>

<svelte:window bind:scrollY={$ypos} bind:innerWidth={$window_width} />

<Banner cinemas={data.cinemas} {selected_cinema} />
<slot />
