<template>
  
<div class="min-h-screen md:min-h-md w-full flex lg:justify-start flex-col gap-4 relative overflow-hidden">
    <div class="flex justify-between items-center p-6 mx-6">
        <HomeLink></HomeLink>

        <LoginLink></LoginLink>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 justify-center items-center w-fit mx-auto gap-16 lg:gap-8 xl:gap-24">

        <HouseTargetComponent></HouseTargetComponent>
        <HouseTargetComponent></HouseTargetComponent>
        <HouseTargetComponent></HouseTargetComponent>
        <HouseTargetComponent></HouseTargetComponent>

    </div>

    
</div>

</template>

<script>
import LoginLink from '@/components/links/LoginLink.vue';
import HomeLink from '@/components/links/HomeLink.vue';
import HouseTargetComponent from '@/components/HouseTargetComponent.vue';
export default {
    components:{
        LoginLink,
        HomeLink,
        HouseTargetComponent
    }
};
</script>

<style>

</style>
