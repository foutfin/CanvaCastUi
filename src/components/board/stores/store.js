import { writable } from 'svelte/store';

export const context = writable(undefined);
export const cvs = writable(undefined);
export const drawing = writable(undefined);
export const path = writable(undefined);
export const pen = writable({type:undefined,stroke:1,color:"1",metadata:undefined});
export const names = writable({});
export const sidebartool = writable("1");
export const shapetool = writable("1");
export const colortool = writable("1");
export const colorPallete = writable(["#000","#ff0000","#ffee00","#0ae415","#0330fc","#fc03ef"])