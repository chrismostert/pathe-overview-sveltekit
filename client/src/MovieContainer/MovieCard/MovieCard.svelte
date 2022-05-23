<script>
    import PosterBlock from "./PosterBlock/PosterBlock.svelte";
    import InfoBlock from "./InfoBlock/InfoBlock.svelte";
    import HideButton from "./HideButton.svelte";
    export let movie;
</script>

<div class="relative text-center xxs:text-left">
    <HideButton {movie} />

    <div class="p-4 mb-1 shadow-md">
        <div class="mb-2">
            <a
                href={`https://www.pathe.nl/film/${movie.patheID}`}
                class="text-xl font-bold text-cyan-700 hover:text-cyan-900"
                >{movie.titleVisual}</a
            >
        </div>

        <div class="flex flex-wrap xxs:flex-nowrap">
            <PosterBlock {movie} />
            <InfoBlock {movie} />
        </div>
    </div>
</div>
