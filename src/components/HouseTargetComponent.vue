<template>
    <div class="bg-white flex flex-col lg:flex-row max-[360px]:w-[17rem] w-[20rem] h-[30rem] lg:w-[30rem] lg:h-[15rem] xl:w-[35rem] rounded">
        <!-- Imagen de la casa -->
        <img src="https://i.ytimg.com/vi/aiyyNslpWRA/sddefault.jpg" alt="" class="max-[360px]:w-[17rem] w-[20rem] h-[14rem] lg:w-[15rem] xl:w-[20rem] lg:h-[15rem] rounded-t">
          
        <!-- Datos de la casa -->
        <div class="flex flex-col items-start p-4 gap-3">
            <span class="font-bold text-[20px] lg:text-[15px]">CALLE PRIMAVERA 123, JARDÍN</span>
            <p class="text-sm">N de habitaciones: 13</p>
            <p class="text-sm">N de baños: 2</p>
            <p class="text-sm">Área: 300m2</p>
            <p class="text-sm">Venta: 250.000€ | Alquiler: 1200€</p>
            <button class="bg-red-600 text-white font-semibold italic rounded px-6 py-1 text-sm cursor-pointer">Solicitar Reserva</button>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>