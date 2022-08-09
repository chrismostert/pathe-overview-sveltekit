<script>
	export let movies;
	import Ratings from './Ratings.svelte';
</script>

{#each movies as movie (movie.pathe.id)}
	<div class="relative">
		<div class="mb-1 p-4 shadow-md">
			<div class="mb-2">
				<a
					href={`https://www.pathe.nl/film/${movie.pathe.id}`}
					class="text-xl font-bold text-cyan-700 hover:text-cyan-900">{movie.pathe.title_visual}</a
				>
			</div>

			<div class="flex">
				<div class="mr-4 shrink-0">
					<img
						src={movie.pathe.poster.includes('poster_missing.png')
							? `https://www.pathe.nl/${movie.pathe.poster}`
							: movie.pathe.poster}
						alt={movie.pathe.title}
						class="mb-2 w-48"
					/>
					{#if movie.rt}
						<Ratings {movie} />
					{/if}
				</div>

				<div>
					<p>{movie.pathe.description}</p>
				</div>
			</div>
		</div>
	</div>
{/each}
