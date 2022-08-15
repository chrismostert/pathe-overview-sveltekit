<script>
	import SideBar from '$lib/components/SideBar.svelte';
	import { ypos } from '$lib/store.js';
	export let cinemas;

	let show
	let yprev = 0;

	$: {
		$ypos > yprev ? (show = false) : (show = true);
		yprev = $ypos;
	}
</script>

<div class="sticky top-0 z-10 origin-top bg-white transition {show ? 'scale-y-100' : 'scale-y-0'}">
	<div class="relative mb-1 flex items-center overflow-x-clip py-4 px-4 shadow-md">
		<SideBar {cinemas} />
		<a href="/" class="h-full"><h1 class="text-lg">Pathé movie overview 🍿</h1></a>
	</div>
</div>
