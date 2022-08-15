<script>
	import SideBar from '$lib/components/SideBar.svelte';
	export let cinemas;
</script>

<div class="relative mb-1 flex items-center overflow-x-clip py-2 px-4 shadow-md">
	<SideBar {cinemas} />
	<a href="/" class="h-full"><h1 class="text-lg">Pathé movie overview 🍿</h1></a>
</div>
