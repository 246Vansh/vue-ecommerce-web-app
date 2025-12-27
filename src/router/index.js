import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SignUpPage from '@/components/SignUpPage.vue'
import LoginPage from '@/components/LoginPage.vue'
import KiaView from '@/views/KiaView.vue'
import Product_Page from '@/components/Product_Page.vue'
import Cart_Page from '@/components/Cart_Page.vue'
import OrderDetails from '@/components/OrderDetails.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path:'/product',
    name:'product',
    component:Product_Page,
  },
  {
    path:'/cart',
    name:'cart',
    component:Cart_Page
  },
  {
    path:'/login',
    name:'login',
    component:LoginPage
  },
  {
    path:'/signup',
    name:'signup',
    component:SignUpPage
  },
  {
    path:'/productdetails/:id',
    name:'productdetails',
    component: () => import("@/components/ProductDetails.vue")
  },
  {
    path:'/checkout',
    name:'checkout',
    component: () => import("@/components/CheckoutPage.vue")
  },
  {
    path:'/orderdetails',
    name:'orderdetails',
    component:OrderDetails
  },
  {
    path:'/kiaview',
    name:'kiaview',
    component:KiaView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
