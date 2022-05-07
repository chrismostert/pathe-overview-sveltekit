<script>
    import { onMount } from "svelte";
    import { cinema_id } from "./options";
    import { loadCinemas } from "./patheApiService";

    let cinemas = [];

    onMount(async () => cinemas = await loadCinemas());
</script>

<div class="py-2 px-4 shadow-md mb-1">
    <label for="cinemas">Bioscoop:</label>
    <select
        bind:value={$cinema_id}
        on:change={localStorage.setItem("cinema_id", $cinema_id)}
        id="cinemas"
        class="outline-none border-2 bg-white"
    >
        {#each cinemas as cinema}
            <option value={cinema.cinema_id}>{cinema.cinema_name}</option>
        {/each}
    </select>
</div>
