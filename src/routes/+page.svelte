<script>
	export let data;
</script>

{#each data.cinemas as cinema}
	<div>
		<a sveltekit:prefetch class="text-lg" href={`/cinema/${cinema.cinema_id}`}
			>{cinema.cinema_name}</a
		>
	</div>
{/each}
