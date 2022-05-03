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
            return "text-white bg-black";
        }
        if (label == "Expat Night") {
            return "bg-[#B09A61]";
        }
        if (label == "Ladies Night") {
            return "text-white bg-[#c821ac]";
        }
        return "bg-[#CFD6EA]";
    }
</script>

<div class={`inline-block rounded-md mr-4 mb-1 p-1 ${getColor(time.label)}`}>
    {time.start} – {time.end} ({time.label})
</div>
