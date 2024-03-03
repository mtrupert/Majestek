<!--Main frontend file. Dashboard page for administrative view-->

<template>
  <div id="app">
    <!-- Vertical Navigation Section -->
    <div class="vertical-nav">
      <button @click="navigate('view_inventory')">View Inventory</button>
      <button @click="navigate('view_tickets')">View Support Tickets</button>
      <button @click="navigate('send_ticket')">Send Support Ticket</button>
      <button @click="navigate('logout')">Logout</button>
    </div>

    <div class="main-content">
      <!-- Two Main Buttons -->
      <div class="large-buttons">
        <button @click="makeReservation">Make a Reservation</button>
        <button @click="viewReservations">View Reservations</button>
      </div>

      <!-- Additional Content Goes Here -->

    </div>
  </div>
</template>

<script>
export default {
  methods: {
    navigate(section) {
      // Implement navigation logic based on the selected section
      // For example, you can use Vue Router or handle it manually
      console.log(`Navigating to ${section}`);
    },
    makeReservation() {
      // Implement logic to handle the "Make Reservation" button click
      console.log("Making Reservation");
    },
    viewReservations() {
      // Implement logic to handle the "View Reservations" button click
      console.log("Viewing Reservations");
    },
  },
};
</script>

<style>
#app {
  display: flex;
}

.vertical-nav {
  width: 150px;
  background-color: #f0f0f0;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.vertical-nav button {
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  text-align: left;
  border: none;
  background-color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;
}

.vertical-nav button:hover {
  background-color: #e0e0e0;
}

.main-content {
  flex: 1;
  padding: 20px;
}

.large-buttons button:first-child {
  margin-right: 20px; 
}

.large-buttons {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.large-buttons button {
  flex: 1;
  padding: 200px 100px;
  font-size: 20px;
  background-color: #ae5252;
  color: #fff;
  border: 2px solid black;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.large-buttons button:hover {
  background-color: #7d0d0d;
}
</style>
