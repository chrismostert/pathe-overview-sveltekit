import { writable } from "svelte/store";

// Defaults to the cinema_id of Pathé Delft (18)
const stored_id = localStorage.getItem("cinema_id");
export const cinema_id = writable(stored_id ? stored_id : "18");
export const hidden_movies = writable([]);