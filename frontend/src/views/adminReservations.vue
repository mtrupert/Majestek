<template>

<div>
    <b-table striped hover v-for="reservation in reservations"></b-table>
</div>

</template>


<script>


import { getAllReservations } from '../services/API';



export default {
    mounted() {
        getAllReservations()
      .then(response => {
        // Assign the response data to the reservations data property
        this.reservations = response;
      })
      .catch(error => {
        console.error('Error fetching reservations:', error);
      });
    },
    data() {
        return {
            reservations: []
        }
    }
}


</script>
