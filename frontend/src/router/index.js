import { createRouter, createWebHistory } from "vue-router"
import makeReserve from '../views/makeReserv.vue'
import viewReserve from '../views/viewReserv.vue'
import viewInventory from '../views/viewInvent.vue'
import viewTickets from '../views/viewTickets.vue'
import Home from '../views/home.vue'

const routes = [
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
        path: '/home',
        name: 'home',
        component: Home
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router