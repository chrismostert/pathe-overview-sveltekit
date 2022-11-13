<script>
	import SideBar from '$lib/components/SideBar.svelte';
	import { ypos, sort_by_audience, only_today } from '$lib/store.js';
	export let cinemas;

	let show;
	let yprev = 0;

	$: {
		$ypos > yprev ? (show = false) : (show = true);
		yprev = $ypos;
	}
</script>

<div class="sticky top-0 z-10 origin-top bg-white transition {show ? 'scale-y-100' : 'scale-y-0'}">
	<div
		class="relative mb-1 flex flex-wrap items-center justify-between gap-y-2 gap-x-2 overflow-x-clip py-4 px-4 shadow-md"
	>
		<div class="flex items-center">
		<SideBar {cinemas} />
		<a class="text-xl font-medium" href="/" sveltekit:prefetch>🍿 Pathé overview</a>
		</div>

		<div class="flex flex-wrap gap-x-2">
			<div class="flex items-center">
				Sorteren op:
				<div class="mt-2">
					<button
						on:click={() => {
							$sort_by_audience = false;
							document.body.scrollIntoView();
						}}
						class="ml-1 {!$sort_by_audience
							? 'bg-cyan-700 text-white'
							: 'bg-gray-100 text-black hover:bg-gray-300'} mb-2 rounded-l-md px-1.5"
						>Critics</button
					>
					<button
						on:click={() => {
							$sort_by_audience = true;
							document.body.scrollIntoView();
						}}
						class="{$sort_by_audience
							? 'bg-cyan-700 text-white'
							: 'bg-gray-100 text-black hover:bg-gray-300'} mr-2 mb-2 -ml-1 rounded-r-md px-1.5"
						>Audience</button
					>
				</div>
			</div>

			<div class="flex items-center gap-x-2">
				<input type="checkbox" id="filter-today" bind:checked={$only_today} />
				<label for="filter-today">Speelt vandaag</label>
			</div>
		</div>
	</div>
</div>
