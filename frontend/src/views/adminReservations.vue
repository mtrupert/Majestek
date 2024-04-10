<template>

  <div class="home-container" v-if="store.role === 'admin'">
    <h2>Reservations</h2>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Date</th>
          <th>User</th>
          <th>Email</th>
          <th>Item</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="reservation in reservations">
          <td>{{ reservation.reserv_start }}</td>
          <td>{{ reservation.user_name }}</td>
          <td>{{ reservation.user_email }}</td>
          <td>{{ reservation.equipment_type }}</td>
          <td>
            <button @click="deleteReservation(reservation.reservation_id)" class="delete-button">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

</template>


<script>

import { useLoggedInUserStore } from '@/store/loggedInUsers';
import { getAllReservations, deleteReservation } from '../services/API';


export default {
  setup() {
    const store = useLoggedInUserStore();
    return {
      store,
      username: store.currentUser,
      role: store.currentRole,
      id: store.currentId,
      isLoggedIn: store.isAuthenticated
    };
  },
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
            reservations: [],
            username: null,
            role: null,
            id: null,
            isLoggedIn: false,
        }
    }
}


</script>

<style scoped>


.table-heading {
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;

}

.loading-spinner {
  font-size: 16px;
  margin-bottom: 20px;
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
}

.custom-table th,
.custom-table td {
  padding: 10px;
  border: 1px solid #ccc;
}

.custom-table th {
  background-color: #f0f0f0;
}

.delete-button {
  padding: 5px 10px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.no-employees {
  font-size: 16px;
  color: #777;
}

.delete-button {
  padding: 8px 16px; /* Padding inside the button */
  background-color: #dc3545; /* Red background color */
  color: #fff; /* White text color */
  border: none; /* No border */
  border-radius: 4px; /* Rounded corners */
  cursor: pointer; /* Cursor style on hover */
  transition: background-color 0.3s ease; /* Smooth transition on background color change */
}

/* Hover effect for delete button */
.delete-button:hover {
  background-color: #c82333; /* Darker red on hover */
}
</style>

