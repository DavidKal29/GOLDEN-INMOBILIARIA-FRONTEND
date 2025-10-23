<template >
  <div class="min-h-screen md:min-h-md w-full flex lg:justify-start flex-col gap-4 relative overflow-hidden"  >
      
    <div class="flex justify-center items-center p-6 mx-6">
        <HomeLink></HomeLink>
        
    </div>

    <div class="flex justify-center itmes-stretch flex-col sm:flex-row p-4 gap-8 xl:gap-[5rem] ">

        <!-- Formulario de Editar PErfil -->
        <form @submit.prevent="edit_profile" action="" class="bg-[#123456] rounded-[10px] flex flex-col justify-center items-center gap-8 py-8 px-4 xl:w-[20rem] xl:h-[34rem]">
            <p class="text-[30px] font-bold text-blue-200">EDIT PROFILE</p>
            <div class="flex flex-col gap-8">
                <input name="email" type="email" placeholder="Email" class="max-[360px]:w-[12rem] w-[16rem] text-center py-2 bg-white rounded-[10px] placeholder:text-gray-700 border-blue-300 border-3 placeholder:italic" v-model="email" required>
                
                <input name="username" type="text" placeholder="Username" class="max-[360px]:w-[12rem] w-[16rem] text-center py-2 bg-white rounded-[10px] placeholder:text-gray-700 border-blue-300 border-3 placeholder:italic" v-model="username" required>
                
                <input name="phone" type="tel" placeholder="Teléfono" class="max-[360px]:w-[12rem] w-[16rem] text-center py-2 bg-white rounded-[10px] placeholder:text-gray-700 border-blue-300 border-3 placeholder:italic" v-model="phone">

                <textarea name="description" placeholder="Description" v-model="description" class="resize-none max-[360px]:w-[12rem] w-[16rem] text-center py-2 bg-white rounded-[10px] placeholder:text-gray-700 border-blue-300 border-3 placeholder:italic"></textarea>
            
            </div>
            <button class="bg-red-500 text-white font-bold text-[15px] rounded w-[9rem] py-2 cursor-pointer">Editar Perfil</button>
            <p class="text-white font-semibold text-sm">¿Todo listo? <router-link to="/profile" class="text-red-500 font-semibold">Volver al perfil</router-link></p>
        </form>

        <!-- Contenido de información -->
         <InfoComponent></InfoComponent>
        
    </div>

    <!-- Circulo -->
     <CircleComponent></CircleComponent>
        
    
  </div>
</template>

<script>
import InfoComponent from '@/components/InfoComponent.vue';
import CircleComponent from '@/components/CircleComponent.vue';
import HomeLink from '@/components/links/HomeLink.vue';
import { toast } from 'vue-sonner';
export default {
    components:{
        InfoComponent,
        CircleComponent,
        HomeLink
    },
    data(){
        return {
            user:null,
            email:'',
            username:'',
            phone:'',
            description:'',
            csrfToken:''
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

                    this.email = this.user.email
                    this.username = this.user.username
                    this.phone = this.user.phone
                    this.description = this.user.description
                }
                
            })
            .catch(err=>{console.error(err);})
        },
        edit_profile(){
            const body = {email:this.email, username:this.username, phone:this.phone, description: this.description}

            fetch(`${process.env.VUE_APP_API_URL}/editProfile`,{
                method:'POST',
                headers:{'Content-Type':'application/json','CSRF-Token':this.csrfToken},
                body:JSON.stringify(body),
                credentials:'include'
            })
            .then(res=>res.json())
            .then(data=>{
                if (data.success) {
                    console.log('Editar perfil ha devuelto exito');
                    toast.success(data.success)
                
                }else{
                    console.log('Editar perfil ha devuelto error');
                    toast.error(data.error)
                }
            })
            .catch(err=>{
                console.log('Error al hacer fetch');
                toast.error(err)
            })

        },
        getCSRFToken(){
            fetch(`${process.env.VUE_APP_API_URL}/csrf-token`,{
                method:'GET',
                credentials:'include'
            })
            .then(res=>res.json())
            .then(data=>{
                this.csrfToken = data.csrfToken
            })
            .catch(err=>{
                console.log('Error al hacer fetch');
                console.log(err);
                toast.error('Error al obtener el csrfToken')
            })
        }
    },
    mounted(){
        this.getCSRFToken()
        this.getProfile()
        document.title = 'Edit Profile'
    }

}
</script>