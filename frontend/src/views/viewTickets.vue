<template>
  <div class="table-container">
    <h2>Ticket List</h2>
    <table class="table">
      <thead>
        <tr>
          <th>Description</th>
          <th>Status</th>
          <th>Date</th>
          <th>User Email</th> <!-- Changed from User ID to User Email -->
          <!-- Add more table headers as needed -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="ticket in tickets" :key="ticket.ticket_id">
          <td>{{ ticket.ticket_desc }}</td>
          <td>{{ ticket.ticket_status }}</td>
          <td>{{ formatDate(ticket.ticket_date) }}</td>
          <td>{{ userEmails[ticket.user_id] }}</td> <!-- Look up user email from userEmails object -->
          <!-- Add more table cells as needed -->
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
// Import the getAllTickets function and getAllUsersEmail function from your API file
import { getAllTickets, getAllUsersEmail } from '../services/API';


export default {
  data() {
    return {
      tickets: [], // Assuming you fetch the ticket data and assign it to this array
      userEmails: {} // Object to store user email addresses
    };
  },
  created() {
    // Fetch ticket data and user emails when the component is created
    this.fetchTicketData();
    this.fetchUserEmails();
  },
  methods: {
    async fetchTicketData() {
      try {
        // Call the getAllTickets function to fetch ticket data
        this.tickets = await getAllTickets();
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    },
    async fetchUserEmails() {
      try {
        // Call the getAllUsersEmail function to fetch user emails
        const userEmails = await getAllUsersEmail();
        this.userEmails = userEmails.reduce((acc, email, index) => {
          acc[index + 1] = email; // Assuming user IDs start from 1
          return acc;
        }, {});
      } catch (error) {
        console.error('Error fetching user emails:', error);
      }
    },
    formatDate(dateString) {
      // Convert date string to a formatted date
      const date = new Date(dateString);
      return date.toLocaleDateString(); // You can adjust the format as needed
    }
  }
};
</script>


<style>
.table-container {
  width: auto; /* Set width to auto for responsive behavior */
  max-width: 100%; /* Limit maximum width to prevent overflow */
}


.table {
  border-collapse: collapse;
  width: 100%; /* Set table width to 100% */
}


.table th, .table td {
  border: 1px solid #dddddd;
  padding: 8px;
  text-align: left;
  white-space: nowrap; /* Prevent line breaks in table cells */
}


.table th {
  background-color: #f2f2f2;
}
</style>





