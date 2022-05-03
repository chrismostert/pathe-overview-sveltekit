<script>
    export let time;
    function getColor(label) {
        if (label == "3D") {
            return "bg-[#FFC426]";
        }
        if (
            label == "Music" ||
            label == "50PLUS" ||
            label == "Arthouse" ||
            label == "DOCS" ||
            label == "Voorpremière" ||
            label == "Opera" ||
            label == "Horror Night"
        ) {
            return "text-white bg-[#188FA7]";
        }
        if (label == "Expat Night") {
            return "text-white bg-[#5C5346]";
        }
        if (label == "Ladies Night") {
            return "bg-[#F49FBC]";
        }
        if (label == "2D") {
            return "bg-[#D8DBE2]";
        }
        return ""
    }
</script>

<div class={`inline-block rounded-md mr-1 mb-2 px-1.5 text-sm text-center shadow-md ${getColor(time.label)}`}>
    {time.start} – {time.end} ({time.label})
</div>
