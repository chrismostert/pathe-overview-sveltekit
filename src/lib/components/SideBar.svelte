<script>
	import { navigating } from '$app/stores';
	export let cinemas, selected;
	let expanded = false;
	let y = 0;
	$: y, (expanded = false);
	$: if ($navigating == null) {
		expanded = false;
	}
</script>

<svelte:window bind:scrollY={y} />

<button on:click={() => (expanded = !expanded)} class="relative z-30 h-8 w-8">
	<div class="absolute top-[20%] h-1 w-8 bg-black transition" class:scale-0={expanded} />
	<div class="absolute top-[50%] h-1 w-8 bg-black transition" class:rotate-45={expanded} />
	<div class="absolute top-[50%] h-1 w-8 bg-black transition" class:-rotate-45={expanded} />
	<div class="absolute top-[80%] h-1 w-8 bg-black transition" class:scale-0={expanded} />
</button>

<div
	class="absolute top-0 left-0 z-20 h-screen -translate-x-[105%] overflow-y-auto bg-white p-12 px-16 shadow-md transition"
	class:translate-x-0={expanded}
>
	<nav>
		<h1 class="mb-2 text-2xl">Selecteer bioscoop</h1>
		<ul>
		{#each cinemas as cinema}
			<li>
				<a sveltekit:prefetch href={`/cinema/${cinema.cinema_id}`}>{cinema.cinema_name}</a>
			</li>
		{/each}
		</ul>
	</nav>
</div>

<div
	on:click={() => (expanded = false)}
	class="absolute top-0 left-0 z-10 h-screen w-screen bg-black transition-opacity {expanded
		? 'visible opacity-70'
		: 'invisible opacity-0'}"
/>
