<script>
    import { onMount } from "svelte";
    import {sidebartool,pen,cvs} from "./stores/store.js";

    export let id ,func=undefined;
    let state = false;


    const clickHandler = () =>{
        // console.log(id);
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
        sidebartool.subscribe((value)=>{
            // console.log(value,`sicon-${id}` == `sicon-${value}`,`sicon-${id}`,`sicon-${value}`);
            const e = document.getElementById(`sicon-${id}`);
            console.log("here",id);
            if (id == value){
                e.style.backgroundColor = "#adb5bd";           
                return;
            }

            if(value == 1){
                if($cvs){
                    $cvs.style.touchAction = "auto";
                    console.log($cvs.style.touchAction);
                }
                
            }else{
                if($cvs){
                    $cvs.style.touchAction = "none";
                    console.log($cvs.style.touchAction);
                }
            }
            e.style.backgroundColor = "transparent";

             
            // console.log(pen);  
        })
    })
    

    

</script>

<div id={`sicon-${id}`} on:click={clickHandler} class="container">
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
    .container:hover{
        /* scale: 1.4;
        transform: translateX(10px); */
        background-color:#adb5bd;
        /* box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px; */
    }

    /* img{
        width: 100%;
        height: 100%;
        background-color: transparent;
    } */
</style>