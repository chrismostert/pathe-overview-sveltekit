import { writable } from "svelte/store";

export const window_width = writable(1000);

const stored_id = localStorage.getItem("cinema_id");
const stored_hidden_movies = localStorage.getItem("hidden_movies", {});

export const cinema_id = writable(stored_id ? stored_id : "18");
export const hidden_movies = writable(stored_hidden_movies ? JSON.parse(stored_hidden_movies) : {});