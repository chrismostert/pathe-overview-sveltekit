<script>
	import { goto } from '$app/navigation';
	export let cinemas;

	let selected = '0';
</script>

<div class="py-2 px-4 shadow-md mb-1">
	<div class="flex flex-row flex-wrap justify-between -mb-2">
		<div class="mb-2 mr-2">
			Bioscoop:
			<select
				id="cinemas"
				bind:value={selected}
				on:change={goto(`/cinema/${selected}`)}
				class="outline-none border-2 bg-white"
			>
				<option value="0" disabled selected>Selecteer een bioscoop</option>
				{#each cinemas as cinema}
					<option value={cinema.cinema_id}>{cinema.cinema_name}</option>
				{/each}
			</select>
		</div>
	</div>
</div>
