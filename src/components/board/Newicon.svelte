<script>
    import { onMount } from "svelte";
    import {sidebartool,pen,cvs} from "./stores/store.js";

    export let id ,func=undefined;

    const clickHandler = () =>{
        if(id == 6){
            func();
        }else{
            sidebartool.update(()=>id); 
            pen.update((p)=>{
                if(id == 2){
                    return {...p,type:id,stroke:2};
                }else if(id == 3){
                    return {...p,type:id,stroke:4};
                }
                return {...p,type:id};            
            });
        }
    }
    onMount(()=>{
        const e = document.getElementById(`sicon-${id}`);
        sidebartool.subscribe((value)=>{
            if (id == value){
                e.style.backgroundColor = "#adb5bd";           
                return;
            }
            if(value == 1){
                if($cvs){
                    $cvs.style.touchAction = "auto";
                }
            }else{
                if($cvs){
                    $cvs.style.touchAction = "none";
                }
            }
            e.style.backgroundColor = "transparent";
        })
    })
    

</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div id={`sicon-${id}`} on:click={clickHandler}  class="container hoverer">
    <slot class="svg"/>
</div>


<style>
    .container{
        cursor: pointer;
        width:40px;
        height:40px;
        -webkit-tap-highlight-color: transparent;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
    }

</style>