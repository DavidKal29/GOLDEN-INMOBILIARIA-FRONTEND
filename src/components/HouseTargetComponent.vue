<template>
    <div class="bg-white flex flex-col lg:flex-row max-[360px]:w-[17rem] w-[20rem] h-[30rem] lg:w-[30rem] lg:h-[15rem] xl:w-[35rem] rounded-[10px]">
        <!-- Imagen de la casa -->
        <img :src="house.image" alt="" class="max-[360px]:w-[17rem] w-[20rem] h-[14rem] lg:w-[15rem] xl:w-[20rem] lg:h-[15rem] rounded-t-[10px] lg:rounded-l-[10px]">
          
        <!-- Datos de la casa -->
        <div class="flex flex-col items-start p-4 gap-3">
            <span class="font-bold text-[20px] lg:text-[15px]">{{ house.address }}</span>
            <p class="text-sm">N de habitaciones: {{ house.bedrooms }}</p>
            <p class="text-sm">N de baños: {{ house.bathrooms }}</p>
            <p class="text-sm">Área: {{ house.area_m2 }} m2</p>
            <p class="text-sm">Precio: {{ house.price }} €</p>
            <router-link v-if="isAdmin" :to="`/admin/edit_house/${house._id}`" class="bg-green-600 text-white font-semibold italic rounded px-6 py-1 text-sm cursor-pointer">Editar</router-link>
            <router-link v-else :to="`/house/${house._id}`" class="bg-red-600 text-white font-semibold italic rounded px-6 py-1 text-sm cursor-pointer">Solicitar Reserva</router-link>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        house:{
            type:Object,
            required:true
        },
        isAdmin:{
            type:Boolean,
            required:true
        }
    }

}
</script>

<style>

</style>