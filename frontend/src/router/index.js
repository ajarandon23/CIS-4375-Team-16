import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '@/views/Login.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('../views/CreateView.vue')
    },
    {
      path: '/customers',
      name: 'customers',
      component: () => import('../views/CustomerView.vue')
    },
    {
      path: '/view',
      name: 'view',
      component: () => import('../views/ListView.vue')
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: () => import('../components/EditComponent.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/addvehicle/:CustomerID',
      name: 'addvehicle',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AddVehicleView.vue')
    },
    {
      path: '/addphoto',
      name: 'addphoto',
      props: true,
      component: () => import('../views/AddPhotoView.vue')
    }
  ]
})
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  // Replace 'HomeView' with the name of your main view or dashboard
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  else next()
});


export default router
