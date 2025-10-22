<template>
  <div class="min-h-screen md:min-h-md w-full flex lg:justify-start flex-col gap-2 relative overflow-hidden">
    
    <!-- Links -->
    <div class="flex justify-between items-center p-6 mx-6">
        <HomeLink></HomeLink>

        <div v-if="user">
            <ProfileLink></ProfileLink>
        </div>
         
    </div>

    <div class="w-full px-4 py-8 flex flex-col items-center text-white">
        <div class="overflow-x-auto w-full max-w-[1500px] rounded scrollbar-hide">
            <!-- Tabla -->
            <table class="w-full whitespace-nowrap border-none">

                <!-- Cabecera de la tabla -->
                <thead class="text-white bg-red-600">
                    <tr>
                        <th class="px-4 py-3 text-[20px] md:text-[25px] font-bold text-center">ID</th>
                        <th class="px-4 py-3 text-[20px] md:text-[25px] font-bold text-center">Email</th>
                        <th class="px-4 py-3 text-[20px] md:text-[25px] font-bold text-center">Username</th>
                        <th class="px-4 py-3 text-[20px] md:text-[25px] font-bold text-center">Phone</th>
                        <th class="px-4 py-3 text-[20px] md:text-[25px] font-bold text-center">Rol</th>
                        <th class="px-4 py-3 text-[20px] md:text-[25px] font-bold text-center">Fecha Registro</th>
                        <th class="px-4 py-3 text-[20px] md:text-[25px] font-bold text-center">Acciones</th>
                    </tr>
                </thead>
                
                <!-- Cuerpo de la tabla -->
                <tbody>

                    <!-- Filas con cada usuario -->
                    <tr v-for="user in users" :key="user._id" class="odd:bg-[#123456] even:bg-[#345678]">
                        <td class="px-4 py-3 text-[16px] md:text-[18px] font-semibold text-center">{{ user._id }}</td>
                        <td class="px-4 py-3 text-[16px] md:text-[18px] font-semibold text-center">{{ user.email }}</td>
                        <td class="px-4 py-3 text-[16px] md:text-[18px] font-semibold text-center">{{ user.username }}</td>
                        <td class="px-4 py-3 text-[16px] md:text-[18px] font-semibold text-center">{{ user.phone || 'No tiene' }}</td>
                        <td class="px-4 py-3 text-[16px] md:text-[18px] font-semibold text-center">{{ user.rol }}</td>
                        <td class="px-4 py-3 text-[16px] md:text-[18px] font-semibold text-center">{{ user.fecha_Registro }}</td>
                        <td class="px-4 py-3 text-[16px] md:text-[18px] font-semibold text-center">
                            
                            <!-- Botones con las acciones del cada usuario -->
                            <div class="flex justify-center gap-4">
                                <a :href="`/admin/user/${user._id}`" target='_blank' class="cursor-pointer text-center bg-green-700 px-4 py-2 rounded text-[15px]">
                                    Ver Perfil
                                </a>
                                
                                <button @click="deletetUser(user._id)" class="cursor-pointer text-center bg-red-600 px-4 py-2 rounded text-[15px]">
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
            users:[]
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
        getUsers(){
            fetch(`${process.env.VUE_APP_API_URL}/users`,{
                method:'GET',
                credentials:'include'
            })
            .then(res=>res.json())
            .then(data=>{
                if (data.users) {
                    this.users = data.users

                }else{
                    console.log(data.error);

                    toast.error(data.error)

                    this.$router.push('/profile')
                    
                }
                
            })
            .catch(err=>{
                console.error(err);

                toast.error('Error al obtener los usuarios')
            })
        },
        deletetUser(id_user){
            fetch(`${process.env.VUE_APP_API_URL}/admin/delete_user/${id_user}`,{
                method:'GET',
                credentials:'include'
            })
            .then(res=>res.json())
            .then(data=>{
                if (data.success) {
                    toast.success(data.success)

                }else{
                    console.log(data.error);

                    toast.error(data.error)
                    
                }
                
            })
            .catch(err=>{
                console.error(err);
                toast.error('Error al intentar borrar al usuario')
            })
            .finally(()=>{
                this.getUsers()
            })
        },


    },
    mounted(){
        this.getProfile()
        this.getUsers()
    }

}
</script>

<style>

</style>