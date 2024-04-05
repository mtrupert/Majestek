import { createRouter, createWebHistory } from "vue-router"
import { useLoggedInUserStore } from "@/store/loggedInUsers"
import makeReserve from '../views/makeReserv.vue'
import viewReserve from '../views/viewReserv.vue'
import viewInventory from '../views/viewInvent.vue'
import viewTickets from '../views/viewTickets.vue'
import home from '../views/home.vue'
import login from '../views/login.vue'
import register from '../views/registration.vue'



const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/makereservation',
            name: 'make-reservation',
            component: makeReserve
        },
        {
            path: '/viewreservations',
            name: 'view-reservations',
            component: viewReserve
        },
        {
            path: '/viewinventory',
            name: 'view-inventory',
            component: viewInventory
        },
        {
            path: '/viewtickets',
            name: 'view-tickets',
            component: viewTickets
        },
        {
            path: '/',
            name: 'home',
            component: home
        },
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '/registration',
            name: 'regstration',
            component: register
        },
        
    ],
}
)

router.beforeEach(async (to, from) => {
    const store = useLoggedInUserStore()
    if (
      !store.isLoggedIn &&
      // ❗️ Avoid an infinite redirect
      to.name !== 'login'
    ) {
      // redirect the user to the login page
      return { name: 'login' }
    }
  })


export default router