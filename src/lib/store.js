import { writable } from 'svelte/store';

export const ypos = writable(0);
export const sort_by_audience = writable(false);
export const hidden_movies = writable({});
export const only_today = writable(false);
