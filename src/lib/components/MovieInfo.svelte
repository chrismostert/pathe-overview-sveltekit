<script>
	export let movie;
	import { window_width } from '$lib/store.js';

	let get_color = (label) => {
		if (label == '2D') {
			return 'bg-2D';
		} else if (label == '3D') {
			return 'bg-3D';
		} else {
			return 'text-white bg-special';
		}
	};

	let expanded = false;
	const START_HEIGHT = 112;

	let date_time_elem;
	let date_height;

	$: if ($window_width && date_time_elem) {
		date_height = date_time_elem.scrollHeight;
	}
</script>

<div>
	<!-- Description -->
	<p>{movie.pathe.description}</p>

	<!-- Date/times -->
	<div
		bind:this={date_time_elem}
		class="overflow-hidden transition-all duration-500"
		style={expanded ? `max-height: ${date_height}px` : `max-height: ${START_HEIGHT}px`}
	>
		<div class="mt-2">
			{#each movie.times as datetime}
				<p class="font-medium">{datetime.day}</p>
				<div class="flex flex-wrap">
					{#each datetime.times as time}
						<div
							class="mr-1 mb-2 inline-block rounded-md px-1.5 text-center text-sm {get_color(
								time.label
							)}"
						>
							{time.start} – {time.end} ({time.label})
						</div>
					{/each}
				</div>
			{/each}
		</div>
	</div>

	<!-- Expand button -->
	{#if date_height > START_HEIGHT}
		<button
			on:click={() => {
				expanded = !expanded;
			}}
			class="w-full rounded-b-2xl bg-gray-100 text-sm hover:bg-gray-300"
			>{expanded ? 'Less times...' : 'More times...'}</button
		>
	{/if}
</div>
