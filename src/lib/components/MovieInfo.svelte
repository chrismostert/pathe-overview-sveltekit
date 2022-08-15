<script>
	export let movie;
</script>

<div>
	<!-- Description -->
	<p>{movie.pathe.description}</p>

	<!-- Date/times -->
	<div class="mt-2">
		{#each movie.times as datetime}
			<p class="font-medium">{datetime.day}</p>
			<div class="flex flex-wrap">
				{#each datetime.times as time}
					<div class="mr-1 mb-2 inline-block rounded-md px-1.5 text-center text-sm">
						{time.start} – {time.end} ({time.label})
					</div>
				{/each}
			</div>
		{/each}
	</div>
</div>
