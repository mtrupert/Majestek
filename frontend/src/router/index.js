import { createRouter, createWebHistory } from "vue-router"
import { useLoggedInUserStore } from "@/store/loggedInUsers"
import makeReserve from '../views/makeReserv.vue'
import viewReserve from '../views/userReservation.vue'
import viewInventory from '../views/viewInvent.vue'
import viewTickets from '../views/viewTickets.vue'
import home from '../views/home.vue'
import login from '../views/login.vue'
import register from '../views/registration.vue'
import makeTicket from '../views/makeTicket.vue'
import forgotPassword from '../views/forgotPassword.vue'
import adminReservation from '../views/adminReservations.vue'



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
            path: '/forgotpassword',
            name: 'forgot-password',
            component: forgotPassword
        },
        {
            path: '/registration',
            name: 'registration',
            component: register
        },
        {
            path:'/maketicket',
            name:'maketicket',
            component: makeTicket
        },
        {
            path: '/adminreservations',
            name: 'adminreservations',
            component: adminReservation
        }
        
    ],
}
)



router.beforeEach(async (to, from, next) => {
    const store = useLoggedInUserStore()
    if (!store.isLoggedIn) {
        // User is not logged in
        if (to.name !== 'login' && to.name !== 'registration') {
          // User is trying to access a route other than login or registration
          next({ name: 'login' }); // Redirect to login page
        } else {
          // Allow access to login or registration page
          next(); // Continue navigation
        }
      } else {
        // User is logged in
        next(); // Continue navigation
      }
  })



export default router