<template>

    <div class="min-h-screen md:min-h-md w-full flex lg:justify-start flex-col gap-2 relative overflow-hidden"  >
        <div class="flex justify-center items-center p-6 mx-6">
            <HomeLink></HomeLink> 
        </div>

        <div class=" w-full flex flex-col lg:flex-row gap-6 p-6 relative">
            
            <!-- Columna perfil -->
            <div class="lg:w-1/4 bg-[#123456] text-white rounded-xl shadow-lg p-6 flex flex-col overflow-hidden">

                <!-- si user es null -->
                <div v-if="!user" class="flex items-center justify-center h-full italic text-gray-300">
                    Cargando datos...
                </div>

                <!-- si user existe -->
                <div v-else class="flex flex-col gap-4">

                    <p class="flex items-center text-[30px] font-bold break-words">
                        {{ user.username ? user.username : 'Sin especificar' }}
                    </p>
                
                    <!-- Info usuario -->
                    <div class="flex flex-col gap-2 text-base break-words">
                        <h3 class="font-semibold mb-1">Información</h3>
                        
                        <p class="flex items-center break-words">
                            <i class="fas fa-envelope mr-2"></i>
                            {{ user.email ? user.email : 'Sin especificar' }}
                        </p>
                        
                        <p class="flex items-center break-words">
                            <i class="fas fa-phone mr-2"></i>
                            {{ user.phone ? user.phone : 'Sin especificar' }}
                        </p>

                        <p class="flex items-center break-words">
                            <i class="fas fa-calendar-alt mr-2"></i>
                            {{ user.fecha_Registro ? user.fecha_Registro : 'Sin especificar' }}
                        </p>
                    
                        <p class="flex items-center break-words">
                            <i class="fas fa-user-tag mr-2"></i>
                            {{ user.rol ? user.rol : 'Sin especificar' }}
                        </p>
                    
                    </div>

                    <!-- Descripción -->
                    <div class="mt-4 leading-relaxed break-words whitespace-pre-wrap">
                        <h3 class="font-semibold mb-1">Descripción</h3>
                        <p class="text-gray-300 italic break-words">
                            {{ user.description ? user.description : 'Sin descripción' }}
                        </p>
                    </div>

                    <div class="flex gap-4 flex-wrap">
                        <RouterLink to="/profile/editProfile" class="text-center bg-green-500 text-white font-bold text-[15px] rounded w-[9rem] py-2 cursor-pointer truncate">
                            Editar Perfil
                        </RouterLink>

                        <button @click="logout" class="bg-red-500 text-white font-bold text-[15px] rounded w-[9rem] py-2 cursor-pointer truncate">
                            Cerrar Sesión
                        </button>
                    </div>

                </div>

            </div>

            <!-- Columna compras -->
            <div v-if="user?.rol != 'admin'" class="lg:w-3/4 flex flex-col gap-4">

                <div class=" max-h-[500px] overflow-y-auto pr-2">

                    <!-- Si houses existe y tiene elementos -->
                    <div v-if="houses && houses.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div
                            v-for="(house, index) in houses"
                            :key="index"
                            class="bg-white rounded shadow-lg overflow-hidden"
                        >
                            <img :src="house.image" alt="Inmueble" class="w-full h-48 object-cover" />
                            <div class="p-4 flex flex-col gap-2">
                                <p class="font-semibold flex items-center"><i class="fas fa-map-marker-alt mr-2"></i>{{ house.address }}</p>
                                <p class=" flex items-center"><i class="fas fa-euro-sign mr-2"></i>{{ house.price }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Si no hay houses -->
                    <div v-else class="flex flex-col items-center justify-center text-center bg-[#123456] text-white rounded-xl p-8">
                        <p class="text-xl md:text-2xl font-semibold mb-4">
                            En este momento no tienes casas
                        </p>
                        <p class="mb-6 text-gray-300">
                            Parece que todavía no has explorado el mercado inmobiliario. No te preocupes, este es el momento perfecto para empezar a descubrir las mejores propiedades. Puedes buscar, comparar y elegir tu primera casa o apartamento y empezar a construir tu portafolio de inmuebles. ¡Cada propiedad que agregues te acercará más a tu objetivo de inversión y confort!
                        </p>
                        <RouterLink to="/home" class="bg-blue-500 transition-colors text-white font-bold py-3 px-6 rounded-md">
                            Ir a Home
                        </RouterLink>
                    </div>
                
                </div>
            
            </div>


            <!-- Div que solo aparece cuando el usuario es admin -->
            <div v-else class="lg:w-3/4 flex flex-col items-center justify-center text-center bg-[#123456] text-white rounded-xl p-8">
                <p class="text-xl md:text-2xl font-semibold mb-4">
                    BIENVENIDO AL PANEL DEL ADMINISTRADOR
                </p>
                        
                <p class="mb-6 text-gray-300">
                    Tienes acceso, tanto a la lista oficial de usuarios registrados, como a la lista de inmuebles registrados en esta web. Además, también podrás añadir nuevos inmuebles para aumentar aún más el catálogo de viviendas.
                </p>
                
                <div class="flex justify-center items-center gap-4">
                    <RouterLink to="/home" class="bg-blue-500 transition-colors text-white font-bold py-3 px-6 rounded-md">
                        Usuarios
                    </RouterLink>

                    <RouterLink to="/home" class="bg-red-500 transition-colors text-white font-bold py-3 px-6 rounded-md">
                        Inmuebles
                    </RouterLink>

                    <RouterLink to="/home" class="bg-green-500 transition-colors text-white font-bold py-3 px-6 rounded-md">
                        Añadir Inmueble
                    </RouterLink>
                </div>
            </div>
        
        </div>

        <CircleComponent></CircleComponent>
    
    </div>

</template>


<script>
import HomeLink from '@/components/links/HomeLink.vue';
import { toast } from 'vue-sonner';
import CircleComponent from '@/components/CircleComponent.vue';
export default {
    components:{
        HomeLink,
        CircleComponent
    },
    data() {
        return {
            user: null,
            houses: [],
            
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
                if (data.error) {
                    this.$router.push('/')
                }else{
                    this.user = data.user 
                }
                
            })
            .catch(err=>{console.error(err);})
        },
        logout(){
            fetch(`${process.env.VUE_APP_API_URL}/logout`,{
                method:'GET',
                credentials:'include'
            })
            .then(res=>res.json())
            .then(data=>{
                if (data.success) {
                    this.$router.push('/')
                }else{
                    toast.error(data.error)
                }
                
            })
            .catch(err=>{console.error(err);})
        },
        getMyHouses(){
            fetch(`${process.env.VUE_APP_API_URL}/getMyHouses`,{
                method:'GET',
                credentials:'include'
            })
            .then(res=>res.json())
            .then(data=>{
                if (data.houses) {
                    console.log('Get houses ha devuelto las casas');

                    this.houses = data.houses

                    console.log(data.house);
                    
                }else{
                    if (data.error) {
                        console.log('Get Houses ha devuleto error');
                        
                        toast.error(data.error)
                    }
                }    
            })
            .catch(err=>{console.error(err);})
        },
    },
    mounted(){
        this.getProfile()
        this.getMyHouses()
    }
};
</script>


