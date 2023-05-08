<script>
	export let rt;

	// Replace external URL with a local version of the icon since the RT API
	// seems to give back a non-existent URL
	const regex = /\/rt-icons\/(.+)\.png/
	function get_local_icon_url(url, kind) {
		return `/${kind}-${url.match(regex)[1]}.svg`;
	}

</script>

{#if rt.vanity}
	<div>
		<a href={`https://www.rottentomatoes.com/m/${rt.vanity}`} rel="external">
			<div class="grid grid-cols-2 items-center justify-items-center">
				<div class="flex items-center">
					{#if rt?.scores?.criticsIconUrl}
						<img src={get_local_icon_url(rt.scores.criticsIconUrl, 'critics')} alt="rt-icon" class="mr-1 h-10 w-10" />
						<p>{rt.scores.criticsScore}%</p>
					{:else}
						<img src="/critics-undefined.svg" alt="rt-icon" class="mr-1 h-10 w-10" />
						<p>-- %</p>
					{/if}
				</div>
				<div class="flex items-center">
					{#if rt?.scores?.audienceIconUrl}
						<img src={get_local_icon_url(rt.scores.audienceIconUrl, 'audience')} alt="rt-icon" class="mr-1 h-10 w-10" />
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
