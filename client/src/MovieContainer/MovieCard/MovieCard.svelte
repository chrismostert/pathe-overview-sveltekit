<script>
    import PosterBlock from "./PosterBlock/PosterBlock.svelte";
    import InfoBlock from "./InfoBlock/InfoBlock.svelte";
    import { hidden_movies } from "../../options";
    export let movie;
</script>

<div class="p-4 mb-1 shadow-md">
    <div class="mb-2">
        <a
            href={`https://www.pathe.nl/film/${movie.patheID}`}
            class="text-xl font-bold text-cyan-700 hover:text-cyan-900"
            >{movie.titleVisual}</a
        >

        <button
            class="text-xs px-1.5 bg-gray-100 hover:bg-gray-300 rounded-md float-right"
            on:click={() => {
                hidden_movies.update((hidden) => {
                    hidden[movie.patheID] = true;
                    return hidden;
                });

                let stored = localStorage.getItem("hidden_movies");
                let persisted_obj = stored ? JSON.parse(stored) : {};

                persisted_obj[movie.patheID] = true;
                localStorage.hidden_movies = JSON.stringify(persisted_obj);
            }}
        >
            Hide
        </button>
    </div>

    <div class="flex">
        <PosterBlock {movie} />
        <InfoBlock {movie} />
    </div>
</div>
