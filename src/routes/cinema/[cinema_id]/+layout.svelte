<script>
	import Banner from '$lib/components/Banner.svelte';
	import { ypos, window_width } from '$lib/store.js';
	export let data;

	const FALLBACK_NAME = 'Onjuiste bioscoop!';
	let selected_cinema;

	$: selected_cinema = data.cinemas.filter((elem) => elem.cinema_id == data.selected_cinema)[0]
		?.cinema_name;
</script>

<svelte:head>
	<title>{selected_cinema || FALLBACK_NAME} | Pathé overview</title>
</svelte:head>
<svelte:window bind:scrollY={$ypos} bind:innerWidth={$window_width} />

<Banner cinemas={data.cinemas} selected_cinema={selected_cinema || FALLBACK_NAME} />
{#if !selected_cinema}
	<div class="mt-4 text-xl">
		De bioscoop die je opgevraagd hebt lijkt niet te bestaan. Kies een andere in het hamburgermenu
		hierboven.
	</div>
{/if}
<slot />
