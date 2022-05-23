<script>
    import { onMount } from "svelte";
    import { cinema_id } from "./options";
    import { loadCinemas } from "./patheApiService";
    import { hidden_movies } from "./options";

    let cinemas = [];

    onMount(async () => {
        cinemas = await loadCinemas();
    });
</script>

<div class="py-2 px-4 shadow-md mb-1">
    <div class="flex flex-wrap justify-between ml-auto">
        <div>
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

        <button
            on:click={() => {
                hidden_movies.set({});
                localStorage.hidden_movies = "{}";
            }}
            class="bg-gray-100 hover:bg-gray-300 rounded-md px-1.5 mt-2 xs:mt-0 text-xs"
            id="clear-btn">Clear hidden movies</button
        >
    </div>
</div>
