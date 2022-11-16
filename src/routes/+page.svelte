<script>
	export let data;
</script>

<div class="mb-4">
	<div class="mb-4 p-4 shadow-md">
		<h1 class="mt-2 mb-4 text-4xl font-semibold">🍿 Pathé overview</h1>
		<h2 class="mb-2 text-lg">
			Alle ingeplande films bij jouw lokale bioscoop. Inclusief draaitijden én Rotten Tomatoes
			score.
		</h2>
		<h2 class="text-lg">Zo mis je nooit meer een goede film!</h2>
	</div>

	<div class="mb-4 p-4 shadow-md">
		<h1 class="mb-2 text-2xl font-semibold">Kies jouw bioscoop</h1>
		<div class="grid grid-cols-2 gap-x-2 gap-y-2">
			{#each data.cinemas as cinema}
				<a
					sveltekit:prefetch
					class="text-md p-2 shadow-sm transition-colors hover:bg-gray-100"
					href={`/cinema/${cinema.cinema_id}`}>{cinema.cinema_name}</a
				>
			{/each}
		</div>
	</div>

	<div class="p-4 shadow-md">
		<h1 class="mb-2 text-2xl font-semibold">Waarom deze site?</h1>
		<p class="mb-2">
			De <a
				href="https://www.pathe.nl/bioscoopagenda"
				rel="external"
				class="text-cyan-700 underline hover:text-cyan-900">bioscoopagenda van Pathé</a
			>
			laat je maar ongeveer twee weken naar de toekomst kijken, en je moet elke dag afzonderlijk selecteren
			om te zien wat er binnenkort gaat draaien. Dit terwijl voor sommige films al bekend is dat ze in
			de bioscoop gaan draaien. Hiervoor kun je naar het
			<a
				href="https://www.pathe.nl/films/actueel"
				rel="external"
				class="text-cyan-700 underline hover:text-cyan-900">actuele filmaanbod van Pathé</a
			> kijken, maar dan moet je per film kijken of deze ook in jouw lokale Pathé draait. Hierdoor mis
			ik wel eens goede films die wellicht maar één avond draaien, terwijl ik deze graag in de bios had
			gezien.
		</p>

		<p>
			Ook is het fijn om vooraf te weten of een film de moeite waard is om te bezoeken. Hiervoor
			wordt automatisch zowel de critic score als de audience score van elke film opgehaald via
			Rotten Tomatoes. Hierdoor geef ik vaak films een kans die ik anders nooit bezocht zou hebben!
		</p>
	</div>
</div>
