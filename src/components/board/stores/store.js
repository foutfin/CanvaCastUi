import { writable } from 'svelte/store';

export const context = writable(undefined);
export const cvs = writable(undefined);
export const drawing = writable(undefined);
export const path = writable(undefined);
export const pen = writable({type:undefined,stroke:1,color:"#000000"});
export const sidebartool = writable("1");