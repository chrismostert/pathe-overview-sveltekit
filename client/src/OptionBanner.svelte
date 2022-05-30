<script>
    import { onMount } from "svelte";
    import { cinema_id } from "./store";
    import { loadCinemas } from "./patheApiService";
    import { hidden_movies, sorted_critics } from "./store";

    let cinemas = [];

    onMount(async () => {
        cinemas = await loadCinemas();
    });
</script>

<div class="py-2 px-4 shadow-md mb-1">
    <div class="flex flex-row flex-wrap justify-between -mb-2">
        <div class="mb-2 mr-2">
            Bioscoop:
            <select
                bind:value={$cinema_id}
                on:change={localStorage.setItem("cinema_id", $cinema_id)}
                id="cinemas"
                class="outline-none border-2 bg-white"
            >
                {#each cinemas as cinema}
                    <option value={cinema.cinema_id}
                        >{cinema.cinema_name}</option
                    >
                {/each}
            </select>
        </div>

        <div class="flex flex-wrap text-sm">
            <div class="mb-2 pt-1">Sort by:</div>
            <button
                on:click={() => {
                    sorted_critics.set(true);
                    localStorage.sorted_critics = true;
                }}
                class="ml-1 {$sorted_critics
                    ? 'bg-cyan-700 text-white'
                    : 'bg-gray-100 hover:bg-gray-300 text-black'} rounded-l-md px-1.5 mb-2"
                >Critics</button
            >
            <button
                on:click={() => {
                    sorted_critics.set(false);
                    localStorage.sorted_critics = false;
                }}
                class="{!$sorted_critics
                    ? 'bg-cyan-700 text-white'
                    : 'bg-gray-100 hover:bg-gray-300 text-black'} rounded-r-md px-1.5 mr-2 mb-2"
                >Audience</button
            >

            <button
                on:click={() => {
                    hidden_movies.set({});
                    localStorage.hidden_movies = "{}";
                }}
                class="bg-gray-100 hover:bg-gray-300 rounded-md px-1.5 mb-2"
                >Clear hidden movies</button
            >
        </div>
    </div>
</div>
