<template>
  <Toaster position="top-right" close-button="top-right" />
  <router-view/>
</template>


<script>
import { Toaster } from 'vue-sonner';
export default{
  components:{
    Toaster
  }
}
</script>

<style>

    body{
        background-image: url('/public/background.avif');
        background-size: cover; 
        background-repeat: no-repeat;
        height: 100%;  
    }     
</style>