<script context="module">
    export async function load( {params } ) {
        return {
            props: {
                cinema_id: params.cinema_id
            }
        }
    }
</script>

<script>
    export let cinema_id;
</script>

<h1>Hello {cinema_id}</h1>