<template>
  <div>
    <b-table striped hover v-for="ticket in tickets"></b-table>
  </div>
</template>

<script>
import { getAllTickets } from '../services/API';

export default {
  mounted() {
    getAllTickets()
      .then(response => {
        // Assign the response data to the Tickets data property
        this.tickets = response;
      })
      .catch(error => {
        console.error('Error fetching Tickets:', error);
      });
  },
  data() {
    return {
      Tickets: []
    };
  }
};
</script>
  