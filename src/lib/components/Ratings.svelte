<script>
	export let movie;
</script>

<div>
	<a href={`https://www.rottentomatoes.com/m/${movie.rt.vanity}`}>
		<div class="grid grid-cols-2 items-center justify-items-center">
			<div class="flex items-center">
				{#if movie.rt.scores && movie.rt.scores.criticsIconUrl}
					<img src={movie.rt.scores.criticsIconUrl} alt="rt-icon" class="mr-1 h-10 w-10" />
					<p>{movie.rt.scores.criticsScore}%</p>
				{:else}
					<img src="/critics-undefined.svg" alt="rt-icon" class="mr-1 h-10 w-10" />
					<p>-- %</p>
				{/if}
			</div>
			<div class="flex items-center">
				{#if movie.rt.scores && movie.rt.scores.audienceIconUrl}
					<img src={movie.rt.scores.audienceIconUrl} alt="rt-icon" class="mr-1 h-10 w-10" />
					<p>{movie.rt.scores.audienceScore}%</p>
				{:else}
					<img src="/audience-undefined.svg" alt="rt-icon" class="mr-1 h-10 w-10" />
					<p>-- %</p>
				{/if}
			</div>
		</div>
	</a>
</div>
