<script>
	export let movies;
	import Ratings from '$lib/components/Ratings.svelte';
	import MovieInfo from '$lib/components/MovieInfo.svelte';
	import { flip } from 'svelte/animate';
	import { sort_by_audience, hidden_movies, only_today } from '$lib/store.js';

	let plays_today = (movie) => {
		return movie.times.find((time) => time.day == 'Vandaag');
	};

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
	<div animate:flip={{ duration: 500 }} class="relative">
		{#if !$hidden_movies[movie.id] && (!$only_today || plays_today(movie))}
			<div class="mb-1 p-4 shadow-md">
				<!-- Hide button-->
				<button
					class="absolute top-0 right-0 mr-1 mt-1 rounded-md bg-gray-100 px-1.5 text-xs hover:bg-gray-300"
					on:click={() => {
						hidden_movies.update((hidden) => {
							hidden[movie.id] = true;
							return hidden;
						});
					}}
				>
					Hide
				</button>

				<!-- Title -->
				<div class="mb-2">
					<a
						href={`https://www.pathe.nl/film/${movie.id}`}
						class="text-xl font-bold text-cyan-700 hover:text-cyan-900"
						rel="external">{movie.pathe.title_visual}</a
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
		{/if}
	</div>
{/each}
