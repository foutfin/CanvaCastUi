<script>
    import { onMount } from "svelte";
    export let src , id,animate=true ,sel;
    console.log("rerender");
    onMount(()=>{
        if(animate){
            if(sel == id){
                const e = document.getElementById(id);
                e.style.scale = 1.5;
                e.style.transform = "translateX(10px)";
            }
        }
    })
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div on:click class="container">
    <img id={id} {src} alt="icon"/>
</div>


<style>
    .container{
        cursor: pointer;
        width:50px;
        height:50px;
        background-color: transparent;
        -webkit-tap-highlight-color: transparent;
    }
    .container:hover{
        scale: 1.4;
        transform: translateX(10px);
    }
    img{
        width: 100%;
        height: 100%;
        background-color: transparent;
    }
</style>