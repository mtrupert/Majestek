<template>
    <div class="reservations-container">
      <div v-for="reservation in reservations" :key="reservation.id" class="reservation-card">
        <div class="reservation-icon">
          <i :class="reservation.icon"></i>
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
  export default {
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
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
}

.reservation-card {
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.reservation-icon {
  text-align: center;
  padding: 20px;
  background-color: #f5f5f5;
}

.reservation-icon i {
  font-size: 24px;
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
</style>
  