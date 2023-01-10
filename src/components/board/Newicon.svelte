<script>
    import { onMount } from "svelte";
    import {sidebartool,pen,cvs,colortool,shapetool} from "./stores/store.js";

    export let id ,func=undefined,store,type,checker=[];

    const clickHandler = () =>{
        checker.forEach(ele=> {
            ele();
        });
        if(type=="sd"){
            if(id == 7 ){
                func();
                return;
             }else if(id == 5 | id == 6){
                func();
             }
        }
        store.update(()=>id); 
        pen.update((p)=>{
            if($sidebartool == 2){
                return {...p,type:$sidebartool,stroke:2,color:$colortool};
            }else if($sidebartool == 3){
                return {...p,type:$sidebartool,stroke:4,color:$colortool};
            }else if($sidebartool == 5){
                return {...p,type:$sidebartool,color:$colortool,metadata:$shapetool};
            }
            return {...p,type:$sidebartool};            
        });

        
            
    }
    onMount(()=>{
        const e = document.getElementById(`${type}-${id}`);
        store.subscribe((value)=>{
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
<div id={`${type}-${id}`} on:click={clickHandler}  class="container hoverer">
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