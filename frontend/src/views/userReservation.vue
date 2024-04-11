<template>
    <div class="reservations-container">
      <div v-for="reservation in reservations" :key="reservation.id" class="reservation-card">
        <div class="reservation-icon">
        <img src = "../assets/computer_icon.png" v-if="reservation.type === 'Laptop'" alt="Laptop">
        <img src = "../assets/locker_icon.png" v-else-if="reservation.type === 'Locker'" alt="Locker">
      </div>
        <div class="reservation-details">
          <!-- Laptop Reservation Details -->
          <div v-if="reservation.type === 'Laptop'" class="details">
            <div class="detail"><strong>Device Name:</strong> {{ reservation.deviceName }}</div>
            <div class="detail"><strong>Serial Number:</strong> {{ reservation.serialNumber }}</div>
            <div class="detail"><strong>Reservation Duration:</strong> {{ reservation.duration }}</div>
          </div>
          
          <!-- Locker Reservation Details -->
          <div v-else class="details">
            <div class="detail"><strong>Locker Number:</strong> {{ reservation.lockerNumber }}</div>
            <div class="detail"><strong>Room:</strong> {{ reservation.room }}</div>
            <div class="detail"><strong>Reservation Duration:</strong> {{ reservation.duration }}</div>
          </div>
        </div>
      </div>
    </div>
  </template>


  <script>

  import { useLoggedInUserStore } from '@/store/loggedInUsers';

  export default {
    setup() {
      const store = useLoggedInUserStore();

      return {
        store,
        username: store.currentUser,
        role: store.currentRole,
        id: store.currentId
      }
    },
    data() {
      return {
        reservations: [
          {
            id: 1,
            type: 'Laptop',
            icon: 'fas fa-laptop',
            deviceName: 'Dell 328',
            serialNumber: '123-456-789',
            duration: 'April 1 - April 10',
          },
          {
            id: 2,
            type: 'Locker',
            icon: 'fas fa-lock',
            lockerNumber: 'Locker 23',
            room: 'Room 101',
            duration: 'April 2 - April 12',
          },
          // Add more reservations as needed
        ],
      };
    },
  }
  </script>
<style>
.reservations-container {
  display: flex;
  margin-right: 25px;
  justify-content: flex;
  gap: 20px;
  padding: 20px;
  width: 100%; /* Ensure the container takes full width */
}

.reservation-card {
  width: 300px; /* Fixed width */
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 20px; /* Add some space at the bottom */
}

.reservation-icon {
  text-align: center;
  padding: 20px;
  background-color: #f5f5f5;
}

.reservation-details {
  padding: 15px;
}

.detail {
  margin-bottom: 10px;
}

.detail strong {
  margin-right: 5px;
}
.reservation-icon img {
  width: 200px; /* Keep your icon size */
  height: auto; /* Maintain aspect ratio */
  display: block; /* Ensure icons are centered */
  margin: 0 auto; /* Center the icon */
}

</style>

  