<script>
    export let movie;
    const handleClick = (e) => {
        window.open(e.currentTarget.getAttribute("url"));
    };
</script>

<div
    class="grid grid-cols-2 justify-items-center items-center cursor-pointer"
    url={`https://www.rottentomatoes.com/m/${movie.rtData.vanity}`}
    on:click={handleClick}
>
    <div class="flex items-center">
        {#if movie.rtData.scores && movie.rtData.scores.criticsIconUrl}
            <img
                src={movie.rtData.scores.criticsIconUrl}
                alt="rt-icon"
                class="w-10 h-10 mr-1"
            />
            <p>{movie.rtData.scores.criticsScore}%</p>
        {:else}
            <img
                src="critics-undefined.svg"
                alt="rt-icon"
                class="w-10 h-10 mr-1"
            />
            <p>-- %</p>
        {/if}
    </div>
    <div class="flex items-center">
        {#if movie.rtData.scores && movie.rtData.scores.audienceIconUrl}
            <img
                src={movie.rtData.scores.audienceIconUrl}
                alt="rt-icon"
                class="w-10 h-10 mr-1"
            />
            <p>{movie.rtData.scores.audienceScore}%</p>
        {:else}
            <img
                src="audience-undefined.svg"
                alt="rt-icon"
                class="w-10 h-10 mr-1"
            />
            <p>-- %</p>
        {/if}
    </div>
</div>
