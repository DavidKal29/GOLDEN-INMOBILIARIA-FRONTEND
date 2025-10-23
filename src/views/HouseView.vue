<template >
  <div class="min-h-screen md:min-h-md w-full flex lg:justify-start flex-col gap-4 relative overflow-hidden"  >

    <div class="flex justify-center items-center p-6">
        <HomeLink></HomeLink>
    </div>

    <div class="flex justify-center items-center flex-col sm:flex-row p-4 gap-8 lg:gap-[5rem]">

        <!-- Formulario de Buy House -->
        <form @submit.prevent="buyHouse" action="" class="bg-[#123456] rounded-[10px] flex flex-col justify-center items-center gap-8 py-8 px-4 max-[360px]:w-[18rem] w-[21rem] sm:h-[35rem] lg:h-[35rem]  xl:w-[20rem] xl:h-[35rem]">
            <p class="text-[30px] font-bold text-blue-200">BUY HOUSE</p>
            <div class="flex flex-col gap-6">
                
                <input name="nombre_titular" type="text" placeholder="Nombre Titular" class="max-[360px]:w-[12rem] w-[16rem] text-center py-2 bg-white rounded-[10px] placeholder:text-gray-700 border-blue-300 border-3 placeholder:italic" required v-model="nombre_titular">

                <input name="numero_tarjeta" type="number" placeholder="Numero Tarjeta" class="max-[360px]:w-[12rem] w-[16rem] text-center py-2 bg-white rounded-[10px] placeholder:text-gray-700 border-blue-300 border-3 placeholder:italic" required v-model="numero_tarjeta">

                <input name="cvv" type="number" placeholder="CVV" class="max-[360px]:w-[12rem] w-[16rem] text-center py-2 bg-white rounded-[10px] placeholder:text-gray-700 border-blue-300 border-3 placeholder:italic" required v-model="cvv">

                <input name="mes" type="number" placeholder="Mes" class="max-[360px]:w-[12rem] w-[16rem] text-center py-2 bg-white rounded-[10px] placeholder:text-gray-700 border-blue-300 border-3 placeholder:italic" required v-model="mes">

                <input name="year" type="number" placeholder="Año" class="max-[360px]:w-[12rem] w-[16rem] text-center py-2 bg-white rounded-[10px] placeholder:text-gray-700 border-blue-300 border-3 placeholder:italic" required v-model="year">
                
                
            </div>
            <button class="bg-red-500 text-white font-bold text-[15px] rounded w-[9rem] py-2 cursor-pointer">Comprar</button>
            
        </form>

        <!-- Contenido de información -->
        <div class="bg-white flex flex-col xl:flex-row max-[360px]:w-[18rem] w-[21rem] h-[30rem] sm:h-[35rem] lg:w-[30rem] lg:h-[35rem] xl:w-[60rem] xl:h-[30rem] rounded-[10px]">
            <!-- Imagen de la casa -->
            <img :src="house?.image" alt="" class="max-[360px]:w-[18rem] w-[21rem] h-[14rem] lg:w-[30rem] xl:w-[20rem] lg:h-[15rem] xl:h-[30rem] xl:w-[35rem] rounded-t-[10px] xl:rounded-l-[10px]">
            
            <!-- Datos de la casa -->
            <div class="flex flex-col items-start p-4 gap-8 lg:gap-4 xl:gap-8">
                <span class="font-bold text-[20px] lg:text-[35px]">{{ house?.address }}</span>
                <p class="text-lg">N de habitaciones: {{ house?.bedrooms }}</p>
                <p class="text-lg">N de baños: {{ house?.bathrooms }}</p>
                <p class="text-lg">Área: {{ house?.area_m2 }} m2</p>
                <p class="text-lg">Precio: {{ house?.price }} €</p>
            </div>
        </div>
        
    </div>

    <!-- Circulo -->
     <CircleComponent></CircleComponent>
    
    
  </div>
</template>

<script>

import CircleComponent from '@/components/CircleComponent.vue';
import HomeLink from '@/components/links/HomeLink.vue';
import { toast } from 'vue-sonner';
export default {
    components:{
        CircleComponent,
        HomeLink
    },
    data(){
        return {
            house:null,
            csrfToken:'',
            nombre_titular:'',
            numero_tarjeta:'',
            cvv:'',
            mes:'',
            year:''
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
                console.log('La data:',data);
                
                if (!data.user) {
                    this.$router.push('/')
                }

                if (data.user && data.user.rol === 'admin') {
                    this.$router.push('/home')
                }
                
                
            })
            .catch(err=>{console.error(err);})
        },
        getHouse(){
            fetch(`${process.env.VUE_APP_API_URL}/house/${this.$route.params.id}`,{
                method:'GET',
                credentials:'include'
            })
            .then(res=>res.json())
            .then(data=>{
                if (data.house) {
                    this.house = data.house

                    console.log(data.house);
                    
                }else{
                    this.$router.push('/home')
                }    
            })
            .catch(err=>{console.error(err);})
        },
        buyHouse(){
            const body = {
                nombre_titular: this.nombre_titular,
                numero_tarjeta: this.numero_tarjeta,
                cvv: this.cvv,
                mes: this.mes,
                year: this.year
            }

            fetch(`${process.env.VUE_APP_API_URL}/buyHouse/${this.house._id}`,{
                method:'POST',
                headers:{'Content-Type':'application/json', 'CSRF-Token':this.csrfToken},
                body:JSON.stringify(body),
                credentials:'include'
            })
            .then(res=>res.json())
            .then(data=>{
                if (data.success) {
                    console.log('BuyHouse ha devuelto exito');
                    this.nombre_titular = ''
                    this.numero_tarjeta = ''
                    this.cvv = ''
                    this.mes = ''
                    this.year = ''

                    toast.success(data.success)

                    this.$router.push('/profile')
                }else{
                    console.log('BuyHouse ha devuelto error');
                    console.log(data.error);
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
        this.getHouse()
        this.getProfile()
        this.getCSRFToken()
        document.title = 'Buy House'
    }


}
</script>

