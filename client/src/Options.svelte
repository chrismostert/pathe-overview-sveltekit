<script>
    import { onMount } from "svelte";
    import { cinema_id } from "./store";

    let cinemas = [];

    onMount(async () => {
        // Fetch cinemas
        const res = await fetch("process.env.API_URL/cinemas");
        cinemas = await res.json();
    });
    
</script>

<div class="py-2 px-4 shadow-md mb-1 border-2">
    <label for="cinemas">Bioscoop:</label>
    <select bind:value={$cinema_id} id="cinemas" class="outline-none border-2 bg-white">
        {#each cinemas as cinema}
            <option value={cinema.cinema_id}>{cinema.cinema_name}</option>
        {/each}
    </select>
</div>
