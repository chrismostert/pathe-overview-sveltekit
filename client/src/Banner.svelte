<script>
    export let CINEMAID_DEFAULT;
    import { onMount } from "svelte";

    let cinemas = [];

    onMount(async () => {
        // Fetch cinemas
        const res = await fetch("process.env.API_URL/cinemas");
        cinemas = await res.json();
    });
</script>

<div class="py-2 px-4 shadow-md mb-1 border-2">
    <label for="cinemas">Bioscoop:</label>

    <select id="cinemas">
        {#each cinemas as cinema}
            {#if cinema.cinema_id == CINEMAID_DEFAULT}
            <option selected value={cinema.cinema_id}>{cinema.cinema_name}</option>
            {:else}
            <option value={cinema.cinema_id}>{cinema.cinema_name}</option>
            {/if}
        {/each}
    </select>
</div>
