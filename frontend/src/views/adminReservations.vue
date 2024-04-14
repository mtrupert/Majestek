<template>

  <div class="home-container">
    <h2>Reservations</h2>
    <div class="container" v-if="selectEquipment">
      <table class="table table-striped">
      <thead>
        <tr>
          <th>Start Date</th>
          <th>Due Date</th>
          <th>Device</th>
          <th>Type</th>
          <th>User</th>
          <th>Email</th>
          <th>Status</th>
          <th>Action</th>
          <button class="tab-button" @click="changeToLockers()">Lockers</button>
        </tr>
      </thead>
      <tbody>
        <tr v-for="device in equipment">
          <td>{{ device.reserv_start }}</td>
          <td>{{ device.reserv_end }}</td>
          <td>{{ device.equipment_name }}</td>
          <td>{{ device.type }}</td>
          <td>{{ device.user_name }}</td>
          <td>{{ device.user_email }}</td>
          <td>{{ device.reserv_status }}</td>
          <td>
            <button @click="handleDelete(device.reservation_id, device.user_name, device.equipment_name )" class="delete-button">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
    <div class="container" v-if="!selectEquipment">
      <table class="table table-striped">
      <thead>
        <tr>
          <th>Start Date</th>
          <th>Due Date</th>
          <th>Locker</th>
          <th>Room</th>
          <th>User</th>
          <th>Email</th>
          <th>Status</th>
          <th>Action</th>
          <button class="tab-button" @click="changeToEquipment()">Devices</button>
        </tr>
      </thead>
      <tbody>
        <tr v-for="locker in lockers">
          <td>{{ locker.reserv_start }}</td>
          <td>{{ locker.reserv_end }}</td>
          <td>{{ locker.serial_num }}</td>
          <td>{{ locker.room_desc }}</td>
          <td>{{ locker.user_name }}</td>
          <td>{{ locker.user_email }}</td>
          <td>{{ locker.reserv_status }}</td>
          <td>
            <button @click="handleDelete(locker.reservation_id, locker.user_name, locker.serial_num )" class="delete-button">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    </div>
    
  </div>

</template>


<script>

import { useLoggedInUserStore } from '@/store/loggedInUsers';
import { getAllLockerReservations, getAllEquipmentReservations, deleteReservation, } from '../services/API';




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
      this.selectEquipment = true;
        getAllLockerReservations()
      .then(response => {
        // Assign the response data to the reservations data property
        this.lockers = response;
        console.log(this.lockers);
      })
      .catch(error => {
        console.error('Error fetching reservations:', error);
      });
      getAllEquipmentReservations()
      .then(response => {
        // Assign the response data to the reservations data property
        this.equipment = response;
        console.log(this.equipment);
      })
      .catch(error => {
        console.error('Error fetching reservations:', error);
      });
    },
    data() {
        return {
            equipment: [],
            lockers: [],
            selectEquipment: false,
            selectLockers: false,
            username: null,
            role: null,
            id: null,
            isLoggedIn: false,
        }
    },
    methods: {
      async handleDelete(id, user, name ) {
        const confirmed = window.confirm(`Are you sure you want to Delete ${name}'s Reservation: ?`);

        if (confirmed) {
                await deleteReservation(id).then(response=>{
                  console.log(response);
                  alert("Reservation Deleted");
                // Perform further actions if needed
                  this.$router.push('/adminreservations')
                })
                
            } else {
                
              return
                
            }
      },
      changeToLockers() {
        this.selectEquipment = false;
        
      },
      changeToEquipment() {
        this.selectEquipment = true;
        
      },
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

.table {
  min-width: 120vh;
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

.table tr:nth-child(even){background-color: #f2f2f2;}

.table tr:hover {background-color: #ddd;}

.tab-button {
  display: inline-block; /* Display as inline block */
  padding: 10px 20px; /* Padding around text */
  margin-right: 5px; /* Margin between tabs (adjust as needed) */
  font-size: 16px; /* Font size */
  font-weight: bold; /* Bold font weight */
  text-align: center; /* Center text */
  border: 2px solid #ccc; /* Border style */
  border-radius: 5px 5px 0 0; /* Rounded corners on top */
  background-color: #c00;; /* Background color */
  cursor: pointer; /* Show pointer cursor on hover */
  color: white;
}

/* Hover state for tab button */
.tab-button:hover {
  background-color: red; /* Darker red on hover */
  border-color: red /* Darker red border on hover */
}


</style>

