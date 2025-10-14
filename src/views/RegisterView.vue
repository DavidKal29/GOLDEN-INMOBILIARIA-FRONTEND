<template >
  <div class="min-h-screen md:min-h-md w-full flex lg:justify-start flex-col gap-4 relative overflow-hidden"  >
    
    <div class="flex justify-center items-center p-6">
        <HomeLink></HomeLink>
    </div>

    <div class="flex justify-center itmes-stretch flex-col sm:flex-row p-4 gap-8 xl:gap-[5rem] ">

        <!-- Formulario de Register -->
        <form @submit.prevent="register" action="" class="bg-[#123456] rounded-[10px] flex flex-col justify-center items-center gap-8 py-8 px-4 xl:w-[20rem] xl:h-[30rem]">
            <p class="text-[30px] font-bold text-blue-200">SIGN UP</p>
            <div class="flex flex-col gap-8">
                <input type="email" placeholder="Email" class="max-[360px]:w-[12rem] w-[16rem] text-center py-2 bg-white rounded-[10px] placeholder:text-gray-700 border-blue-300 border-3 placeholder:italic" v-model="email" required>
                
                <input type="text" placeholder="Username" class="max-[360px]:w-[12rem] w-[16rem] text-center py-2 bg-white rounded-[10px] placeholder:text-gray-700 border-blue-300 border-3 placeholder:italic" v-model="username" required>
                
                <input type="password" placeholder="Password" class="max-[360px]:w-[12rem] w-[16rem] text-center py-2 bg-white rounded-[10px] placeholder:text-gray-700 border-blue-300 border-3 placeholder:italic" v-model="password" required>
            </div>
            <button class="bg-red-500 text-white font-bold text-[15px] rounded w-[9rem] py-2 cursor-pointer">Crear Cuenta</button>
            <p class="text-white font-semibold text-sm">¿Ya tienes cuenta? <router-link to="/login" class="text-red-500 font-semibold">Iniciar Sesión</router-link></p>
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
export default {
    components:{
        InfoComponent,
        CircleComponent,
        HomeLink
    },
    data(){
        return {
            email:'',
            username:'',
            password:''
        }
    },
    methods:{
        register(){
            const body = {email:this.email, username:this.username, password:this.password}

            fetch(`${process.env.VUE_APP_API_URL}/register`,{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(body),
                credentials:'include'
            })
            .then(res=>res.json())
            .then(data=>{
                if (data.success) {
                    console.log('Register ha devuelto exito');
                    this.email = ''
                    this.username = ''
                    this.password = ''
                    alert(data.success)
                }else{
                    console.log('Register ha devuelto error');
                    alert(data.error)
                }
            })
            .catch(err=>{
                console.log('Error al hacer fetch');
                alert(err)
            })

        }
    }

}
</script>

<style>

    body{
        background-image: url('/public/background.avif');
        background-size: cover; 
        background-repeat: no-repeat;
        height: 100%;  
    }     
</style>