<script>
	export let movie;
	import { page } from '$app/stores';
	import { slide } from 'svelte/transition';

	let get_color = (label) => {
		if (label == '2D') {
			return 'bg-2D';
		} else if (label == '3D') {
			return 'bg-3D';
		} else {
			return 'text-white bg-special';
		}
	};
</script>

<div>
	<!-- Description -->
	<p>{movie.pathe.description}</p>

	<!-- Date/times -->
	{#key $page.params.cinema_id}
		<div class="mt-2" transition:slide>
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
	{/key}
</div>
