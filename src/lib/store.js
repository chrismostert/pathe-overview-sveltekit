import { writable } from 'svelte/store';
import { persisted as writeable_persistent } from 'svelte-local-storage-store';

let HIDDEN_MOVIES_STORAGE_KEY = 'pathe_hidden_movies';

export const window_width = writable(1000);
export const ypos = writable(0);

export const sort_by_audience = writable(false);
export const hidden_movies = writeable_persistent(HIDDEN_MOVIES_STORAGE_KEY, {});
export const only_today = writable(false);
