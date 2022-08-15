<script>
	import SideBar from '$lib/components/SideBar.svelte';
	export let cinemas, selected;
</script>

<div class="relative mb-1 overflow-x-clip py-2 px-4 shadow-md">
	<SideBar {cinemas} {selected} />
</div>
