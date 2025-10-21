import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import HomeView from '@/views/HomeView.vue'
import ProfileView from '@/views/ProfileView.vue'
import EditProfileView from '@/views/EditProfileView.vue'
import HouseView from '@/views/HouseView.vue'
import ForgotPasswordView from '@/views/ForgotPasswordView.vue'
import ChangePasswordView from '@/views/ChangePasswordView.vue'
import AdminUsersView from '@/views/AdminUsersView.vue'

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView
  },
  {
    path: '/profile/editProfile',
    name: 'editProfile',
    component: EditProfileView
  },
  {
    path: '/house/:id',
    name: 'house',
    component: HouseView
  },
  {
    path: '/forgotPassword',
    name: 'forgotPassword',
    component: ForgotPasswordView
  },
  {
    path: '/changePassword/:token',
    name: 'changePassword',
    component: ChangePasswordView
  },
  {
    path: '/admin/users',
    name: 'adminUsers',
    component: AdminUsersView
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
