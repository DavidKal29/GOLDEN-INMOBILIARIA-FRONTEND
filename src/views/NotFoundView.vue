<template>
  <div
    class="min-h-screen w-full flex flex-col items-center justify-start relative overflow-hidden gap-12 md:gap-24"
  >
    <div class="flex justify-center items-center p-6 top-0">
        <HomeLink></HomeLink>
    </div>

    <div
      class="flex flex-col items-center justify-center text-center text-white p-10 rounded mx-4 mx-w-[800px] bg-[#123456]"
    >
      <h1 class="text-[50px] md:text-8xl font-extrabold mb-6">
        404
      </h1>
      <h2 class="text-[40px] md:text-4xl font-semibold mb-4">
        Página no encontrada
      </h2>
      <p class="text-[20px] text-center max-w-xl">
        Lo sentimos, la página que buscas no existe o ha sido movida.  
        Vuelve al inicio cuando quieras.
      </p>
    </div>
  </div>
</template>

<script>
import HomeLink from '@/components/links/HomeLink.vue'

export default {
  name: 'NotFound',
  components: {
    HomeLink
  }
}
</script>

<style>


</style>

