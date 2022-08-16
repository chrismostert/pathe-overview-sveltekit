<script>
	export let movies;
	import Ratings from '$lib/components/Ratings.svelte';
	import MovieInfo from '$lib/components/MovieInfo.svelte';

	import { flip } from 'svelte/animate';

	import { sort_by_audience } from '$lib/store.js';

	$: {
		let field = $sort_by_audience ? 'audienceScore' : 'criticsScore';
		movies = movies.sort((a, b) => {
			let score_a = a?.rt?.scores?.[field] || 0;
			let score_b = b?.rt?.scores?.[field] || 0;
			return score_b - score_a;
		});
	}
</script>

{#each movies as movie (movie.id)}
	<div animate:flip={{ duration: 500 }}>
		<div class="mb-1 p-4 shadow-md">
			<!-- Title -->
			<div class="mb-2">
				<a
					href={`https://www.pathe.nl/film/${movie.id}`}
					class="text-xl font-bold text-cyan-700 hover:text-cyan-900">{movie.pathe.title_visual}</a
				>
			</div>

			<!-- Block element -->
			<div class="flex">
				<!-- Poster with rating -->
				<div class="mr-4 shrink-0">
					<img
						src={movie.pathe.poster.includes('poster_missing.png')
							? `https://www.pathe.nl/${movie.pathe.poster}`
							: movie.pathe.poster}
						alt={movie.title}
						class="mb-2 w-48"
					/>
					{#if movie.rt}
						<Ratings rt={movie.rt} />
					{/if}
				</div>

				<!-- Description with times -->
				<MovieInfo {movie} />
			</div>
		</div>
	</div>
{/each}
