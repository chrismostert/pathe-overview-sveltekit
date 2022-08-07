<script>
	import { goto } from '$app/navigation';
	export let cinemas, selected;
</script>

<div class="mb-1 py-2 px-4 shadow-md">
	<div class="-mb-2 flex flex-row flex-wrap justify-between">
		<div class="mb-2 mr-2">
			Bioscoop:
			<select
				id="cinemas"
				bind:value={selected}
				on:change={goto(`/cinema/${selected}`)}
				class="border-2 bg-white outline-none"
			>
				<option value="0" disabled selected>Selecteer een bioscoop</option>
				{#each cinemas as cinema}
					<option value={cinema.cinema_id}>{cinema.cinema_name}</option>
				{/each}
			</select>
		</div>
	</div>
</div>
