<template>
  <div class="min-h-screen md:min-h-md w-full flex lg:justify-start flex-col gap-6 relative overflow-hidden">
    
    <!-- Links -->
    <div class="flex justify-between items-center p-6 mx-6">
        <HomeLink></HomeLink>

        <div v-if="user">
            <ProfileLink></ProfileLink>
        </div>
         
    </div>


    <div class="flex justify-center items-center flex-col gap-6 xl:gap-20 mx-12 sm:flex-row">
        <button @click="changeCategory('house')" :class="['cursor-pointer text-white rounded px-4 py-2 text-center w-full xl:w-1/4',category === 'house' ? 'bg-green-500' : 'bg-blue-900']">Casas Abandonadas</button>
        <button @click="changeCategory('industrial')" :class="['cursor-pointer text-white rounded px-4 py-2 text-center w-full xl:w-1/4',category === 'industrial' ? 'bg-green-500' : 'bg-blue-900']">Naves Industriales</button>
        <button @click="changeCategory('castle')" :class="['cursor-pointer text-white rounded px-4 py-2 text-center w-full xl:w-1/4',category === 'castle' ? 'bg-green-500' : 'bg-blue-900']">Castillos Antiguos</button>
    </div>

    <div class="flex justify-center items-center flex-col gap-6 xl:gap-20 mx-12 sm:flex-row">
        <button @click="changeRented(false)" :class="['cursor-pointer text-white rounded px-4 py-2 text-center w-full xl:w-1/4',rented === false ? 'bg-green-500' : 'bg-blue-900']">No Compradas</button>
        <button @click="changeRented(true)" :class="['cursor-pointer text-white rounded px-4 py-2 text-center w-full xl:w-1/4',rented === true ? 'bg-green-500' : 'bg-blue-900']">Compradas</button>
    </div>

    <div class="w-full px-4 py-8 flex flex-col items-center text-white">
        <div class="overflow-x-auto w-full max-w-[1450px] rounded scrollbar-hide">
            <!-- Tabla -->
            <table class="w-full whitespace-nowrap border-none">

                <!-- Cabecera de la tabla -->
                <thead class="text-white bg-red-600">
                    <tr>
                        <th class="px-4 py-3 text-[20px] md:text-[25px] font-bold text-center">Image</th>
                        <th class="px-4 py-3 text-[20px] md:text-[25px] font-bold text-center">ID</th>
                        <th class="px-4 py-3 text-[20px] md:text-[25px] font-bold text-center">Dirección</th>
                        <th class="px-4 py-3 text-[20px] md:text-[25px] font-bold text-center">Habitaciones</th>
                        <th class="px-4 py-3 text-[20px] md:text-[25px] font-bold text-center">Baños</th>
                        <th class="px-4 py-3 text-[20px] md:text-[25px] font-bold text-center">Área</th>
                        <th class="px-4 py-3 text-[20px] md:text-[25px] font-bold text-center">Precio</th>
                        <th class="px-4 py-3 text-[20px] md:text-[25px] font-bold text-center">ID User</th>
                        <th class="px-4 py-3 text-[20px] md:text-[25px] font-bold text-center">Acciones</th>
                    </tr>
                </thead>
                
                <!-- Cuerpo de la tabla -->
                <tbody>

                    <!-- Filas con cada casa -->
                    <tr v-for="house in houses" :key="house._id" class="odd:bg-[#123456] even:bg-[#345678]">
                        <td class="px-4 py-3 text-[16px] md:text-[18px] font-semibold text-center">
                            <img :src="house.image" :alt="house.address" className='rounded w-[8rem]' />
                        </td>
                        <td class="px-4 py-3 text-[16px] md:text-[18px] font-semibold text-center">{{ house._id }}</td>
                        <td class="px-4 py-3 text-[16px] md:text-[18px] font-semibold text-center">{{ house.address }}</td>
                        <td class="px-4 py-3 text-[16px] md:text-[18px] font-semibold text-center">{{ house.bedrooms }}</td>
                        <td class="px-4 py-3 text-[16px] md:text-[18px] font-semibold text-center">{{ house.bathrooms }}</td>
                        <td class="px-4 py-3 text-[16px] md:text-[18px] font-semibold text-center">{{ house.area_m2 }} m2</td>
                        <td class="px-4 py-3 text-[16px] md:text-[18px] font-semibold text-center">{{ house.price }} €</td>
                        <td class="px-4 py-3 text-[16px] md:text-[18px] font-semibold text-center">{{ house.id_user || 'No tiene' }}</td>
                        <td class="px-4 py-3 text-[16px] md:text-[18px] font-semibold text-center">
                            
                            <!-- Botones con las acciones del cada casa -->
                            <div class="flex justify-center gap-4">
                                <a target='_blank' class="cursor-pointer text-center bg-green-600 px-4 py-2 rounded text-[15px]">
                                    Editar
                                </a>

                                <a v-if="house?.id_user" :href="`/admin/user/${house.id_user}`" target='_blank' class="cursor-pointer text-center bg-blue-600 px-4 py-2 rounded text-[15px]">
                                    Comprador
                                </a>
                                
                                <button class="cursor-pointer text-center bg-red-600 px-4 py-2 rounded text-[15px]">
                                    Eliminar
                                </button>
                            </div>
                        
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    

    
  
  
  </div>
</template>

<script>
import HomeLink from '@/components/links/HomeLink.vue';
import ProfileLink from '@/components/links/ProfileLink.vue';
import { toast } from 'vue-sonner';
export default {
    components:{
        HomeLink,
        ProfileLink
    },
    data(){
        return {
            user:null,
            category:'house',
            rented:true,
            houses:[]
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

                    if (data.user.rol != 'admin') {
                        this.$router.push('/')
                    }

                }else{
                    this.$router.push('/')
                }
                
            })
            .catch(err=>{console.error(err);})
        },
        getHouses(){
            fetch(`${process.env.VUE_APP_API_URL}/admin/houses/${this.category}/${this.rented}`,{
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
        },
        changeRented(bool){
            this.rented = bool
            this.getHouses()
        }


    },
    mounted(){
        this.getProfile()
        this.getHouses()
    }

}
</script>

<style>

</style>