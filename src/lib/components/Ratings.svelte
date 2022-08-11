<script>
	export let rt;
</script>

{#if rt.vanity}
	<div>
		<a href={`https://www.rottentomatoes.com/m/${rt.vanity}`}>
			<div class="grid grid-cols-2 items-center justify-items-center">
				<div class="flex items-center">
					{#if rt.scores && rt.scores.criticsIconUrl}
						<img src={rt.scores.criticsIconUrl} alt="rt-icon" class="mr-1 h-10 w-10" />
						<p>{rt.scores.criticsScore}%</p>
					{:else}
						<img src="/critics-undefined.svg" alt="rt-icon" class="mr-1 h-10 w-10" />
						<p>-- %</p>
					{/if}
				</div>
				<div class="flex items-center">
					{#if rt.scores && rt.scores.audienceIconUrl}
						<img src={rt.scores.audienceIconUrl} alt="rt-icon" class="mr-1 h-10 w-10" />
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
