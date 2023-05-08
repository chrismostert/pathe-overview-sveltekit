<script>
	export let rt;
</script>

{#if rt.vanity}
	<div>
		<a href={`https://www.rottentomatoes.com/m/${rt.vanity}`} rel="external">
			<div class="grid grid-cols-2 items-center justify-items-center">
				<div class="flex items-center">
					{#if rt?.scores?.criticsIconUrl}
						<img src={`/critics-${rt.scores.criticsScore < 60 ? 'rotten' : 'fresh'}.svg`} alt="rt-icon" class="mr-1 h-10 w-10" />
						<p>{rt.scores.criticsScore}%</p>
					{:else}
						<img src="/critics-undefined.svg" alt="rt-icon" class="mr-1 h-10 w-10" />
						<p>-- %</p>
					{/if}
				</div>
				<div class="flex items-center">
					{#if rt?.scores?.audienceIconUrl}
						<img src={`/audience-${rt.scores.audienceScore < 60 ? 'green_popcorn' : 'red_popcorn'}.svg`} alt="rt-icon" class="mr-1 h-10 w-10" />
						<p>{rt.scores.audienceScore}%</p>
					{:else}
						<img src="/audience-undefined.svg" alt="rt-icon" class="mr-1 h-10 w-10" />
						<p>-- %</p>
					{/if}
				</div>
			</div>
		</a>
	</div>
{/if}
