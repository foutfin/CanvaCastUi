import { writable } from 'svelte/store';

export const context = writable(undefined);
export const drawing = writable(undefined);
export const path = writable(undefined);
export const pen = writable({pen:undefined,color:undefined});