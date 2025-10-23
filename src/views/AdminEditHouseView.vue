<template >
  <div class="min-h-screen md:min-h-md w-full flex lg:justify-start flex-col gap-4 relative overflow-hidden"  >

    <div class="flex justify-center items-center p-6">
        <HomeLink></HomeLink>
    </div>

    <div class="flex justify-center items-center flex-col sm:flex-row p-4 gap-8 lg:gap-[5rem]">

        <!-- Formulario de Edit House -->
        <form @submit.prevent="editHouse" action="" class="bg-[#123456] rounded-[10px] flex flex-col justify-center items-center gap-8 py-8 px-4 max-[360px]:w-[18rem] w-[21rem] sm:h-[35rem] lg:h-[35rem]  xl:w-[20rem] xl:h-[35rem]">
            <p class="text-[30px] font-bold text-blue-200">EDIT HOUSE</p>
            <div class="flex flex-col gap-6">
                
                <input name="address" type="text" placeholder="Dirección" class="max-[360px]:w-[12rem] w-[16rem] text-center py-2 bg-white rounded-[10px] placeholder:text-gray-700 border-blue-300 border-3 placeholder:italic" required v-model="address">

                <div class="flex w-full gap-1">
                    <input name="bedrooms" type="number" placeholder="Habitaciones" class="max-[360px]:w-[6rem] w-[8rem] text-center py-2 bg-white rounded-[10px] placeholder:text-gray-700 border-blue-300 border-3 placeholder:italic" required v-model="bedrooms">

                    <input name="bathrooms" type="number" placeholder="Baños" class="max-[360px]:w-[6rem] w-[8rem] text-center py-2 bg-white rounded-[10px] placeholder:text-gray-700 border-blue-300 border-3 placeholder:italic" required v-model="bathrooms">
                </div>

                <select name="category" class="max-[360px]:w-[12rem] w-[16rem] text-center py-2 bg-white rounded-[10px] placeholder:text-gray-700 border-blue-300 border-3 placeholder:italic" v-model="category">
                    <option value="house">house</option>
                    <option  value="castle">castle</option>
                    <option value="industrial">industrial</option>
                </select>

                <div class="flex w-full gap-1">
                    <input name="area_m2" type="number" placeholder="Área" class="max-[360px]:w-[6rem] w-[8rem] text-center py-2 bg-white rounded-[10px] placeholder:text-gray-700 border-blue-300 border-3 placeholder:italic" required v-model="area_m2">

                    <input name="price" type="number" placeholder="Precio" class="max-[360px]:w-[6rem] w-[8rem] text-center py-2 bg-white rounded-[10px] placeholder:text-gray-700 border-blue-300 border-3 placeholder:italic" required v-model="price">
                </div>


                <input name="image" type="text" placeholder="Enlace Imagen" class="max-[360px]:w-[12rem] w-[16rem] text-center py-2 bg-white rounded-[10px] placeholder:text-gray-700 border-blue-300 border-3 placeholder:italic" required v-model="image">
                
                
            </div>
            <button class="bg-red-500 text-white font-bold text-[15px] rounded w-[9rem] py-2 cursor-pointer">Editar</button>
            
        </form>

        <!-- Contenido de información -->
        <div class="bg-white flex flex-col xl:flex-row max-[360px]:w-[18rem] w-[21rem] h-[30rem] sm:h-[35rem] lg:w-[30rem] lg:h-[35rem] xl:w-[60rem] xl:h-[30rem] rounded-[10px]">
            <!-- Imagen de la casa -->
            <img :src="image" alt="" class="max-[360px]:w-[18rem] w-[21rem] h-[14rem] lg:w-[30rem] xl:w-[20rem] lg:h-[15rem] xl:h-[30rem] xl:w-[35rem] rounded-t-[10px] xl:rounded-l-[10px]">
            
            <!-- Datos de la casa -->
            <div class="flex flex-col items-start p-4 gap-2  xl:gap-6">
                <span class="font-bold text-[20px] lg:text-[35px]">{{ address }}</span>
                <p class="text-lg">N de habitaciones: {{ bedrooms }}</p>
                <p class="text-lg">N de baños: {{ bathrooms }}</p>
                <p class="text-lg">Área: {{ area_m2 }} m2</p>
                <p class="text-lg">Precio: {{ price }} €</p>
                <p class="text-lg">Categoría: {{ category }}</p>
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
            address: '',
            bedrooms: '',
            bathrooms: '',
            area_m2: '',
            price: '',
            image: '',
            category:''
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

                if (data.user && data.user.rol === 'client') {
                    this.$router.push('/home')
                }
                
                
            })
            .catch(err=>{console.error(err);})
        },
        getHouse(){
            fetch(`${process.env.VUE_APP_API_URL}/admin/house/${this.$route.params.id}`,{
                method:'GET',
                credentials:'include'
            })
            .then(res=>res.json())
            .then(data=>{
                if (data.house) {
                    this.house = data.house
                    this.address = this.house.address || ''
                    this.bedrooms = this.house.bedrooms 
                    this.bathrooms = this.house.bathrooms 
                    this.area_m2 = this.house.area_m2 || ''
                    this.price = this.house.price || ''
                    this.image = this.house.image || ''
                    this.category = this.house.category || ''

                    console.log(data.house);
                    
                }else{
                    this.$router.push('/home')
                }    
            })
            .catch(err=>{console.error(err);})
        },
        editHouse(){
            const body = {
                address:this.address,
                bedrooms:this.bedrooms,
                bathrooms:this.bathrooms,
                area_m2:this.area_m2,
                price:this.price,
                category:this.category,
                image:this.image
            }

            fetch(`${process.env.VUE_APP_API_URL}/admin/house/${this.house._id}`,{
                method:'POST',
                headers:{'Content-Type':'application/json', 'CSRF-Token':this.csrfToken},
                body:JSON.stringify(body),
                credentials:'include'
            })
            .then(res=>res.json())
            .then(data=>{
                if (data.success) {
                    console.log('Edit House ha devuelto exito');

                    toast.success(data.success)
                }else{
                    console.log('Edit House ha devuelto error');
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
        document.title = 'Edit House'
    }


}
</script>