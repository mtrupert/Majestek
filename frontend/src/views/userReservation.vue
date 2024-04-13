<template>
    <div class="reservations-container" v-if="laptops">
      <div v-for="laptop in laptops" class="reservation-card">
        <div class="reservation-icon">
        <img src = "../assets/computer_icon.png" alt="Laptop">
        <!-- <img src = "../assets/locker_icon.png" v-else-if="reservation.type === 'Locker'" alt="Locker">
        <img src = "../assets/accessory_icon.png" v-else-if="reservation.type === 'Accessories'" alt="Accessories"> -->
      </div>
        <div class="reservation-details">
          <!-- Laptop & Accessories Reservation Details -->
          <div  class="details">
            <div class="detail"><strong>Device Name:</strong> {{ laptop.equipment_name }}</div>
            <div class="detail"><strong>Serial Number:</strong> {{ laptop.serial_number }}</div>
            <div class="detail"><strong>Reservation:</strong> {{ formatDate(laptop.reserv_start) }}</div>
            <div class="detail"><strong>Due:</strong> {{ formatDate(laptop.reserv_end) }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- Accessories -->
    <div class="reservations-container" v-if="accessories">
      <div v-for="accessory in accessories" class="reservation-card">
        <div class="reservation-icon">
        <img src = "../assets/accessory_icon.png" alt="Laptop">
        <!-- <img src = "../assets/locker_icon.png" v-else-if="reservation.type === 'Locker'" alt="Locker">
        <img src = "../assets/accessory_icon.png" v-else-if="reservation.type === 'Accessories'" alt="Accessories"> -->
      </div>
        <div class="reservation-details">
          <!-- Accessories Reservation Details -->
          <div  class="details">
            <div class="detail"><strong>Device Name:</strong> {{ accessory.equipment_name }}</div>
            <div class="detail"><strong>Serial Number:</strong> {{ accessory.serial_number }}</div>
            <div class="detail"><strong>Reservation:</strong> {{ formatDate(accessory.reserv_start) }}</div>
            <div class="detail"><strong>Due:</strong> {{ formatDate(accessory.reserv_end) }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- Accessories -->
    <div class="reservations-container" v-if="lockers">
      <div v-for="locker in lockers" class="reservation-card">
        <div class="reservation-icon">
        <img src = "../assets/locker_icon.png" alt="Laptop">
        <!-- <img src = "../assets/locker_icon.png" v-else-if="reservation.type === 'Locker'" alt="Locker">
        <img src = "../assets/accessory_icon.png" v-else-if="reservation.type === 'Accessories'" alt="Accessories"> -->
      </div>
        <div class="reservation-details">
          <!-- Accessories Reservation Details -->
          <div  class="details">
            <div class="detail"><strong>Locker:</strong> {{ locker.serial_num }}</div>
            <div class="detail"><strong>Location:</strong> {{ locker.room_desc }}</div>
            <div class="detail"><strong>Reservation:</strong> {{ formatDate(locker.reserv_start) }}</div>
            <div class="detail"><strong>Due:</strong> {{ formatDate(locker.reserv_end) }}</div>
          </div>
        </div>
      </div>
    </div>
  </template>


  <script>

  import { useLoggedInUserStore } from '@/store/loggedInUsers';
  import { getLaptopReservationByID, getAccessoriesReservationByID, getLockerReservationByID } from '@/services/API';
  import { ref } from 'vue';

  export default {
    mounted() {
      getLaptopReservationByID(this.user_id).then(response=> {
        this.laptops = response
        console.log(this.laptops)
      })
      getAccessoriesReservationByID(this.user_id).then(response=> {
        this.accessories = response
        console.log(this.accessories)
      })
      getLockerReservationByID(this.user_id).then(response=> {
        this.lockers = response
        console.log(this.lockers)
      })
    },
    setup() {
      const store = useLoggedInUserStore();

      const user_id = ref(store.id)

      return {
        store,
        username: store.currentUser,
        role: store.currentRole,
        user_id
      }
    },
    data() {
      return {
        laptops: [],
        accessories: [],
        lockers: []
      };
    },
    methods: {
      formatDate(date) {
        const newDate = new Date(date);

        const options = { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        };
        
        const formattedDate = newDate.toLocaleDateString('en-US', options);

        return formattedDate
      }
    }
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


  