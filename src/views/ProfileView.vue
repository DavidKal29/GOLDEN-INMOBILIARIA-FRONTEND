<template>

    <div class="min-h-screen md:min-h-md w-full flex lg:justify-start flex-col gap-2 relative overflow-hidden"  >
        <div class="flex justify-center items-center p-6 mx-6">
            <HomeLink></HomeLink> 
        </div>

        <div class=" w-full flex flex-col lg:flex-row gap-6 p-6 relative">
            
            <!-- Columna perfil -->
            <div class="lg:w-1/4 bg-[#123456] text-white rounded-xl shadow-lg p-6 flex flex-col ">

                <!-- si user es null -->
                <div v-if="!user" class="flex items-center justify-center h-full italic text-gray-300">
                    Cargando datos...
                </div>

                <!-- si user existe -->
                <div v-else class="flex flex-col gap-4">
                    <p class="flex items-center text-[40px] font-bold">{{ user.username ? user.username : 'Sin especificar' }} </p>
                
                    <!-- Info usuario -->
                    <div class="flex flex-col gap-2 text-base">
                        <h3 class="font-semibold mb-1">Información</h3>
                        
                        <p class="flex items-center">
                            <i class="fas fa-envelope mr-2"></i>
                            {{ user.email ? user.email : 'Sin especificar' }}
                        </p>
                        
                        <p class="flex items-center">
                            <i class="fas fa-phone mr-2"></i>
                            {{ user.phone ? user.phone : 'Sin especificar' }}
                        </p>

                        <p class="flex items-center">
                            <i class="fas fa-calendar-alt mr-2"></i>
                            {{ user.fecha_Registro ? user.fecha_Registro : 'Sin especificar' }}
                        </p>
                    
                        
                        <p class="flex items-center">
                            <i class="fas fa-user-tag mr-2"></i>
                            {{ user.rol ? user.rol : 'Sin especificar' }}
                        </p>
                    
                    </div>

                    <!-- Descripción -->
                    <div class="mt-4">
                        <h3 class="font-semibold mb-1">Descripción</h3>
                        <p class="text-gray-300 italic">
                            {{ user.description ? user.description : 'Sin descripción' }}
                        </p>
                    </div>

                    <div class="flex  gap-4">
                        <button class="bg-green-500 text-white font-bold text-[15px] rounded w-[9rem] py-2 cursor-pointer">Editar Perfil</button>

                        <button @click="logout" class="bg-red-500 text-white font-bold text-[15px] rounded w-[9rem] py-2 cursor-pointer">Cerrar Sesión</button>
                    </div>

                </div>

            </div>

            <!-- Columna compras -->
            <div class="lg:w-3/4 flex flex-col gap-4">

                <div class=" max-h-[500px] overflow-y-auto pr-2">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div
                            v-for="(compra, index) in compras"
                            :key="index"
                            class="bg-white rounded shadow-lg overflow-hidden"
                        >
                            <img :src="compra.imagen" alt="Inmueble" class="w-full h-48 object-cover" />
                            <div class="p-4 flex flex-col gap-2">
                                <p class="font-semibold flex items-center"><i class="fas fa-map-marker-alt mr-2"></i>{{ compra.ubicacion }}</p>
                                <p class=" flex items-center"><i class="fas fa-euro-sign mr-2"></i>{{ compra.precio }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            
            </div>

        </div>
    
    </div>

</template>

<script>
import HomeLink from '@/components/links/HomeLink.vue';
import { toast } from 'vue-sonner';
export default {
    components:{
        HomeLink
    },
    data() {
        return {
            user: null,
            compras: [
                { imagen: 'https://i.ytimg.com/vi/aiyyNslpWRA/sddefault.jpg', ubicacion: 'CALLE PRIMAVERA 123, JARDÍN', precio: '250 000€' },
                { imagen: 'https://i.ytimg.com/vi/aiyyNslpWRA/sddefault.jpg', ubicacion: 'AVENIDA SOL 45, CENTRO', precio: '320 000€' },
                { imagen: 'https://i.ytimg.com/vi/aiyyNslpWRA/sddefault.jpg', ubicacion: 'PLAZA LUNA 7, NORTE', precio: '180 000€' },
                { imagen: 'https://i.ytimg.com/vi/aiyyNslpWRA/sddefault.jpg', ubicacion: 'CALLE ROSA 9, SUR', precio: '210 000€' },
                { imagen: 'https://i.ytimg.com/vi/aiyyNslpWRA/sddefault.jpg', ubicacion: 'AVENIDA CIELO 11, ESTE', precio: '400 000€' },
            ]
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
    },
    mounted(){
        this.getProfile()
    }
};
</script>


