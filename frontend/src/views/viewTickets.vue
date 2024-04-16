<template>
  <div class="table-container">
    <h2>Ticket List</h2>
    <table class="table">
      <thead>
        <tr>
          <th>Description</th>
          <th>Status</th>
          <th>Date</th>
          <th>User Email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ticket in tickets" :key="ticket.ticket_id">
          <td>{{ ticket.ticket_desc }}</td>
          <td>
            <select v-model="ticket.ticket_status" @change="updateStatus(ticket)">
              <option :value="ticket.ticket_status">{{ ticket.ticket_status }}</option>
              <option value="resolve">Resolve</option>
              <option value="in progress">In Progress</option>
            </select>
          </td>
          <td>{{ formatDate(ticket.ticket_date) }}</td>
          <td>{{ userEmails[ticket.user_id] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getAllTickets, getAllUsersEmail, updateTicket } from '../services/API';

export default {
  data() {
    return {
      tickets: [],
      userEmails: {}
    };
  },
  created() {
    this.fetchTicketData();
    this.fetchUserEmails();
  },
  methods: {
    async fetchTicketData() {
      try {
        // Fetch ticket data including the existing status from the backend
        this.tickets = await getAllTickets();
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    },
    async fetchUserEmails() {
      try {
        const userEmails = await getAllUsersEmail();
        this.userEmails = userEmails.reduce((acc, email, index) => {
          acc[index + 1] = email;
          return acc;
        }, {});
      } catch (error) {
        console.error('Error fetching user emails:', error);
      }
    },
    async updateStatus(ticket) {
      try {
        // Update the ticket status in the backend
        await updateTicket(ticket.ticket_id, ticket.ticket_status);
        console.log('Ticket status updated successfully.');
      } catch (error) {
        console.error('Error updating ticket status:', error);
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString();
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





