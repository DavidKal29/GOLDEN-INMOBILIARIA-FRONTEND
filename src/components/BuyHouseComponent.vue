<template>
    <div class="bg-white flex flex-col xl:flex-row max-[360px]:w-[18rem] w-[21rem] h-[30rem] sm:h-[35rem] lg:w-[30rem] lg:h-[35rem] xl:w-[60rem] xl:h-[30rem] rounded-[10px]">
        <!-- Imagen de la casa -->
        <img :src="house?.image" alt="" class="max-[360px]:w-[18rem] w-[21rem] h-[14rem] lg:w-[30rem] xl:w-[20rem] lg:h-[15rem] xl:h-[30rem] xl:w-[35rem] rounded-t-[10px] xl:rounded-l-[10px]">
                    
        <!-- Datos de la casa -->
        <div class="flex flex-col items-start p-4 gap-4 lg:gap-4 xl:gap-8">
            <span class="font-bold text-[20px] lg:text-[35px]">{{ house?.address }}</span>
            <p class="text-lg">N de habitaciones: {{ house?.bedrooms }}</p>
            <p class="text-lg">N de baños: {{ house?.bathrooms }}</p>
            <p class="text-lg">Área: {{ house?.area_m2 }} m2</p>
            <p class="text-lg">Precio: {{ house?.price }} €</p>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        house:{
            type:Object,
            required:true
        }
    }

}
</script>

<style>

</style>