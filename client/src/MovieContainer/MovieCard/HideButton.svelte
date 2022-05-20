<script>
    import { hidden_movies } from "../../options";
    export let movie;
</script>

<button
    class="text-xs px-1.5 mr-1 mt-1 bg-gray-100 hover:bg-gray-300 rounded-md absolute top-0 right-0"
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
