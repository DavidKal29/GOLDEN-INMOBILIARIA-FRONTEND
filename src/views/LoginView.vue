<template >
  <div class="min-h-screen md:min-h-md w-full flex lg:justify-start flex-col gap-4 relative overflow-hidden"  >

    <div class="flex justify-center items-center p-6">
        <HomeLink></HomeLink>
    </div>

    <div class="flex justify-center itmes-stretch flex-col sm:flex-row p-4 gap-8 xl:gap-[5rem]">

        <!-- Formulario de Login -->
        <form @submit.prevent="login" action="" class="bg-[#123456] rounded-[10px] flex flex-col justify-center items-center gap-12 py-8 px-4 xl:w-[20rem] xl:h-[30rem]">
            <p class="text-[30px] font-bold text-blue-200">SIGN IN</p>
            <div class="flex flex-col gap-8">
                
                <input name="email" type="email" placeholder="Email" class="max-[360px]:w-[12rem] w-[16rem] text-center py-2 bg-white rounded-[10px] placeholder:text-gray-700 border-blue-300 border-3 placeholder:italic" v-model="email" required>
                
                <input name="password" autocomplete="off" type="password" placeholder="Password" class="max-[360px]:w-[12rem] w-[16rem] text-center py-2 bg-white rounded-[10px] placeholder:text-gray-700 border-blue-300 border-3 placeholder:italic" v-model="password" required>
            </div>

            
            <button class="bg-red-500 text-white font-bold text-[15px] rounded w-[9rem] py-2 cursor-pointer">Acceder</button>
            
            <div class="flex flex-col gap-4 text-center">
                <p class="text-white font-semibold text-sm">¿No tienes cuenta? <router-link to="/register" class="text-red-500 font-semibold">Crear Cuenta</router-link></p>

                <p class="text-white font-semibold text-sm">¿Olvidaste la contraseña? <router-link to="/forgotPassword" class="text-red-500 font-semibold">Recuperar aquí</router-link></p>
            
            </div>
            
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
            email:'',
            password:'',
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
                if (data.user) {
                    this.$router.push('/profile')
                }
                
            })
            .catch(err=>{console.error(err);})
        },
        login(){
            const body = {email:this.email, password:this.password}

            fetch(`${process.env.VUE_APP_API_URL}/login`,{
                method:'POST',
                headers:{'Content-Type':'application/json', 'CSRF-Token':this.csrfToken},
                body:JSON.stringify(body),
                credentials:'include'
            })
            .then(res=>res.json())
            .then(data=>{
                if (data.success) {
                    console.log('Login ha devuelto exito');
                    this.email = ''
                    this.username = ''
                    this.password = ''

                    this.$router.push('/profile')
                }else{
                    console.log('Login ha devuelto error');
                    toast.error(data.error)
                }
            })
            .catch(err=>{
                console.log('Error al hacer fetch');
                console.log(err);
                toast.error('Error al enviar datos')
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
    }


}
</script>

