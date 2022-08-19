<script>
	import SideBar from '$lib/components/SideBar.svelte';
	import { ypos, sort_by_audience } from '$lib/store.js';
	export let data;

	let show;
	let yprev = 0;

	$: {
		$ypos > yprev ? (show = false) : (show = true);
		yprev = $ypos;
	}
</script>

<div class="sticky top-0 z-10 origin-top bg-white transition {show ? 'scale-y-100' : 'scale-y-0'}">
	<div class="relative mb-1 flex items-center overflow-x-clip py-4 px-4 shadow-md">
		<SideBar {data} />

		<a href="/" class="mr-2"><h1 class="text-lg">Pathé movie overview 🍿</h1></a>

		<div class="flex text-sm">
			<div class="mb-2 pt-1">Sort by:</div>
			<button
				on:click={() => {
					$sort_by_audience = false;
					document.body.scrollIntoView();
				}}
				class="ml-1 {!$sort_by_audience
					? 'bg-cyan-700 text-white'
					: 'bg-gray-100 text-black hover:bg-gray-300'} mb-2 rounded-l-md px-1.5">Critics</button
			>
			<button
				on:click={() => {
					$sort_by_audience = true;
					document.body.scrollIntoView();
				}}
				class="{$sort_by_audience
					? 'bg-cyan-700 text-white'
					: 'bg-gray-100 text-black hover:bg-gray-300'} mr-2 mb-2 rounded-r-md px-1.5"
				>Audience</button
			>
		</div>
	</div>
</div>
