<template>
  
<div class="min-h-screen md:min-h-md w-full flex lg:justify-start flex-col gap-10 relative overflow-hidden">
    <div class="flex justify-between items-center p-6 mx-6">
        <HomeLink></HomeLink>


        <div v-if="user">
            <ProfileLink></ProfileLink>
        </div>

        <div v-else>
            <LoginLink></LoginLink>
        </div>
         
    </div>

    <div class="flex justify-center items-center flex-col gap-6 xl:gap-20 mx-12 sm:flex-row">
        <button @click="changeCategory('house')" :class="['hover:bg-red-500 duration-600 cursor-pointer text-white rounded px-4 py-2 text-center w-full xl:w-1/4',category === 'house' ? 'bg-orange-500' : 'bg-blue-900']">Casas Abandonadas</button>
        <button @click="changeCategory('industrial')" :class="['hover:bg-red-500 duration-600 cursor-pointer text-white rounded px-4 py-2 text-center w-full xl:w-1/4',category === 'industrial' ? 'bg-orange-500' : 'bg-blue-900']">Naves Industriales</button>
        <button @click="changeCategory('castle')" :class="['hover:bg-red-500 duration-600 cursor-pointer text-white rounded px-4 py-2 text-center w-full xl:w-1/4',category === 'castle' ? 'bg-orange-500' : 'bg-blue-900']">Castillos Antiguos</button>
    </div>

    <div v-if="user?.rol === 'admin'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 justify-center items-center w-fit mx-auto gap-16 lg:gap-8 xl:gap-24 max-h-[500px] md:max-h-[1000px] xl:max-h-[600px] overflow-y-auto mb-12">
        <HouseTargetComponent  v-for="house in houses" :key="house._id" :house="house" :isAdmin="true" ></HouseTargetComponent>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 justify-center items-center w-fit mx-auto gap-16 lg:gap-8 xl:gap-24 max-h-[500px] md:max-h-[1000px] xl:max-h-[600px] overflow-y-auto mb-12">
        <HouseTargetComponent  v-for="house in houses" :key="house._id" :house="house" :isAdmin="false" ></HouseTargetComponent>
    </div>

    
</div>

</template>

<script>
import LoginLink from '@/components/links/LoginLink.vue';
import HomeLink from '@/components/links/HomeLink.vue';
import ProfileLink from '@/components/links/ProfileLink.vue';
import HouseTargetComponent from '@/components/HouseTargetComponent.vue';
import { toast } from 'vue-sonner';
export default {
    components:{
        LoginLink,
        HomeLink,
        ProfileLink,
        HouseTargetComponent
    },
    data(){
        return {
            user:null,
            category:'house',
            houses: []
        }
    },
    methods:{
        getProfile(){
            fetch(`${process.env.VUE_APP_API_URL}/profile`,{
                method:'GET',
                credentials:'include'
            })
            .then(res=>res.json())
            .then(data=>{
                if (data.user) {
                    this.user = data.user
                }
                
            })
            .catch(err=>{console.error(err);})
        },
        getHouses(){
            fetch(`${process.env.VUE_APP_API_URL}/houses/${this.category}`,{
                method:'GET',
                credentials:'include'
            })
            .then(res=>res.json())
            .then(data=>{
                if (data.houses) {
                    this.houses = data.houses
                }else{
                    toast.error(data.error)
                }
                
            })
            .catch(err=>{console.error(err);})
        },
        changeCategory(newCategory){
            this.category = newCategory
            this.getHouses()
        }
    },
    mounted(){
        this.getHouses()
        this.getProfile()
    }
};
</script>

<style>

</style>
