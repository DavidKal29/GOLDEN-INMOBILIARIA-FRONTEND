<template>
  <div class="min-h-screen md:min-h-md w-full flex lg:justify-start flex-col gap-4 relative overflow-hidden"  >
      
    <div class="flex justify-center items-center p-6">
        <HomeLink></HomeLink>
    </div>

    <div class="flex justify-center itmes-stretch flex-col sm:flex-row p-4 gap-8 xl:gap-[5rem] ">

        <!-- Formulario de Perfil -->
        <form @submit.prevent="register" action="" class="bg-[#123456] rounded-[10px] flex flex-col justify-center items-center gap-8 py-8 px-4 xl:w-[20rem] xl:h-[30rem]">
            <p class="text-[30px] font-bold text-blue-200">EDIT PROFILE</p>
            <div class="flex flex-col gap-8">
                <input type="email" placeholder="Email" class="max-[360px]:w-[12rem] w-[16rem] text-center py-2 bg-white rounded-[10px] placeholder:text-gray-700 border-blue-300 border-3 placeholder:italic" v-model="email" required>
                
                <input type="text" placeholder="Username" class="max-[360px]:w-[12rem] w-[16rem] text-center py-2 bg-white rounded-[10px] placeholder:text-gray-700 border-blue-300 border-3 placeholder:italic" v-model="username" required>
                
            </div>
            <button class="bg-red-500 text-white font-bold text-[15px] rounded w-[9rem] py-2 cursor-pointer">Editar perfil</button>
        </form>

       
        
    </div>
        
  </div>
</template>

<script>
import HomeLink from '@/components/links/HomeLink.vue';
export default {
    components:{
        HomeLink
    }

}
</script>

<style>

</style>