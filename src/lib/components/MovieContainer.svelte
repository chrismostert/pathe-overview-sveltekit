<script>
	export let movies;
	import Ratings from '$lib/components/Ratings.svelte';
	import MovieInfo from '$lib/components/MovieInfo.svelte';
</script>

{#each movies as movie (movie.id)}
	<div class="relative">
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
