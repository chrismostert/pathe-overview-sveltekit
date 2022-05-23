<script>
    export let time;
    function getColor(label) {
        if (label == "3D") {
            return "bg-[#FFC426]";
        }
        if (label == "2D") {
            return "bg-[#D8DBE2]";
        }
        return "text-white bg-[#188FA7]";
    }
</script>

<div
    class={`inline-block rounded-md mr-1 mb-2 px-1.5 text-sm text-center ${getColor(
        time.label
    )}`}
>
    {time.start} – {time.end} ({time.label})
</div>
