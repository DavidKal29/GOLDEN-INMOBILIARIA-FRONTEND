<template >
  <div class="min-h-screen md:min-h-md w-full flex lg:justify-start flex-col gap-4 relative overflow-hidden"  >
    
    <div class="flex justify-center items-center p-6">
        <HomeLink></HomeLink>
    </div>

    <div class="flex justify-center itmes-stretch flex-col sm:flex-row p-4 gap-8 xl:gap-[5rem]">

        <!-- Formulario de Login -->
        <form action="" class="bg-[#123456] rounded-[10px] flex flex-col justify-center items-center gap-16 py-8 px-4 xl:w-[20rem] xl:h-[30rem]">
            <p class="text-[30px] font-bold text-blue-200">SIGN IN</p>
            <div class="flex flex-col gap-8">
                <input type="email" placeholder="Email" class="max-[360px]:w-[12rem] w-[16rem] text-center py-2 bg-white rounded-[10px] placeholder:text-gray-700 border-blue-300 border-3 placeholder:italic">
                <input type="password" placeholder="Password" class="max-[360px]:w-[12rem] w-[16rem] text-center py-2 bg-white rounded-[10px] placeholder:text-gray-700 border-blue-300 border-3 placeholder:italic">
            </div>
            <button class="bg-red-500 text-white font-bold text-[15px] rounded w-[9rem] py-2 cursor-pointer">Acceder</button>
            <p class="text-white font-semibold text-sm">¿No tienes cuenta? <router-link to="/register" class="text-red-500 font-semibold">Crear Cuenta</router-link></p>
        </form>

        <!-- Contenido de información -->
         <InfoComponent></InfoComponent>
        
    </div>

    <!-- Circulo -->
     <CircleComponent></CircleComponent>
    
    
  </div>
</template>

<script>
import InfoComponent from '@/components/InfoComponent.vue';
import CircleComponent from '@/components/CircleComponent.vue';
import HomeLink from '@/components/links/HomeLink.vue';
export default {
    components:{
        InfoComponent,
        CircleComponent,
        HomeLink
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