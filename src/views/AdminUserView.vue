<template>

    <div class="min-h-screen md:min-h-md w-full flex lg:justify-start flex-col gap-2 relative overflow-hidden"  >
        <div class="flex justify-center items-center p-6 mx-6">
            <HomeLink></HomeLink> 
        </div>

        <div class=" w-full flex flex-col lg:flex-row gap-6 p-6 relative">
            
            <!-- Columna perfil -->
            <div class="lg:w-1/4 bg-[#123456] text-white rounded-xl shadow-lg p-6 flex flex-col overflow-hidden">

                <!-- si user es null -->
                <div v-if="!userData?.user" class="flex items-center justify-center h-full italic text-gray-300">
                    Cargando datos...
                </div>

                <!-- si user existe -->
                <div v-else class="flex flex-col gap-4">

                    <p class="flex items-center text-[30px] font-bold break-words">
                        {{ userData?.user?.username ? userData?.user?.username : 'Sin especificar' }}
                    </p>
                
                    <!-- Info usuario -->
                    <div class="flex flex-col gap-2 text-base break-words">
                        <h3 class="font-semibold mb-1">Información</h3>
                        
                        <p class="flex items-center break-words">
                            <i class="fas fa-envelope mr-2"></i>
                            {{ userData?.user?.email ? userData?.user?.email : 'Sin especificar' }}
                        </p>
                        
                        <p class="flex items-center break-words">
                            <i class="fas fa-phone mr-2"></i>
                            {{ userData?.user?.phone ? userData?.user?.phone : 'Sin especificar' }}
                        </p>

                        <p class="flex items-center break-words">
                            <i class="fas fa-calendar-alt mr-2"></i>
                            {{ userData?.user?.fecha_Registro ? userData?.user?.fecha_Registro : 'Sin especificar' }}
                        </p>
                    
                        <p class="flex items-center break-words">
                            <i class="fas fa-user-tag mr-2"></i>
                            {{ userData?.user?.rol ? userData?.user?.rol : 'Sin especificar' }}
                        </p>
                    
                    </div>

                    <!-- Descripción -->
                    <div class="mt-4 leading-relaxed break-words whitespace-pre-wrap">
                        <h3 class="font-semibold mb-1">Descripción</h3>
                        <p class="text-gray-300 italic break-words">
                            {{ userData?.user?.description ? userData?.user?.description : 'Sin descripción' }}
                        </p>
                    </div>


                </div>

            </div>

            <!-- Columna compras -->
            <div v-if="userData?.user?.rol != 'admin'" class="lg:w-3/4 flex flex-col gap-4">

                <div class=" max-h-[500px] overflow-y-auto pr-2">

                    <!-- Si houses existe y tiene elementos -->
                    <div v-if="userData?.houses && userData?.houses.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div
                            v-for="(house, index) in userData?.houses"
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
                            Este usuario no ha comprado ningún inmueble
                        </p>
                        <p class="mb-6 text-gray-300">
                            Parece que este usuario todavía no ha explorado el mercado inmobiliario. Este es el momento perfecto para que empiece a descubrir las mejores propiedades. Puede buscar, comparar y elegir su primera casa o apartamento y empezar a construir su portafolio de inmuebles. ¡Cada propiedad que agregue se acercará más a su objetivo de inversión y confort!
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
                    ESTE USUARIO ES ADMINISTRADOR
                </p>
                        
                <p class="mb-6 text-gray-300">
                    Tiene acceso, tanto a la lista oficial de usuarios registrados, como a la lista de inmuebles registrados en esta web. Además, también puede añadir nuevos inmuebles para aumentar aún más el catálogo de viviendas.
                </p>
                
                <RouterLink to="/profile" class="bg-green-500 transition-colors text-white font-bold py-3 px-6 rounded-md">
                    Volver a mi panel
                </RouterLink>

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
            userData:null
            
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
        getUserData(){
            fetch(`${process.env.VUE_APP_API_URL}/admin/users/${this.$route.params.id}`,{
                method:'GET',
                credentials:'include'
            })
            .then(res=>res.json())
            .then(data=>{
                if (data.userData) {
                    console.log('Get user admin ha devuelto la data del usuario');

                    this.userData = data.userData

                    console.log(data.userData);
                    
                }else{
                    if (data.error) {
                        console.log('Get user admin ha devuleto error');
                        
                        toast.error(data.error)

                        this.$router.push('/admin/users')
                    }
                }    
            })
            .catch(err=>{console.error(err);})
        },
    },
    mounted(){
        this.getProfile()
        this.getUserData()
    }
};
</script>