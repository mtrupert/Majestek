<template>
  <div id="app">

    <!-- Vertical Navigation Section -->
    <div class="vertical-nav">
      <img src="./assets/UHLOGO.jpg" alt="Logo" class="logo">
      <button @click="navigate('view_inventory')">View Inventory</button>
      <button @click="navigate('view_tickets')">View Support Tickets</button>
      <button @click="navigate('send_ticket')">Send Support Ticket</button>
      <button @click="navigate('logout')">Logout</button>
    </div>

    <!--Main Area of Page-->
    <div class="main-content">
      <!-- Two Main Buttons -->
      <div class="large-buttons">
        <button @click="makeReservation">Make a Reservation <img src="./assets/clipboard_icon.png" alt="Make Reservations Icon" class="icon"></button>
        <button @click="viewReservations">View Reservations <img src="./assets/computer_icon.png" alt="View Reservations Icon" class="icon"></button>
      </div>

      <!-- Additional Content Sections -->
      <div v-if="currentSection === 'view_inventory'">
        <h2>View Inventory</h2>
        <!-- Add content related to viewing inventory -->
      </div>

      <div v-if="currentSection === 'view_tickets'">
        <h2>View Support Tickets</h2>
        <!-- Add content related to viewing support tickets -->
      </div>

      <div v-if="currentSection === 'send_ticket'">
        <h2>Send Support Ticket</h2>
        <!-- Add content related to sending support ticket -->
      </div>

      <div v-if="currentSection === 'logout'">
        <!-- Implement logic to logout user -->
      </div>

      <div v-if="currentSection === 'make_reservation'">
        <h2>Make a Reservation</h2>
        <!-- Add content/form to make a reservation -->
      </div>

      <div v-if="currentSection === 'view_reservations'">
        <h2>View Reservations</h2>
        <!-- Add content related to viewing reservations -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentSection: 'make_reservation' // Default section
    }
  },
  methods: {
    navigate(section) {
      // Implement navigation logic based on the selected section
      this.currentSection = section;
    },
    makeReservation() {
      // Implement logic to handle the "Make Reservation" button click
      this.currentSection = 'make_reservation';
    },
    viewReservations() {
      // Implement logic to handle the "View Reservations" button click
      this.currentSection = 'view_reservations';
    },
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  background-color: #f5f5f5; /* Light gray background */
}

#app {
  display: flex;
  min-height: 100vh; /* Make the app div span the entire viewport height */
  background-color: #f5f5f5; /* Light gray background */
}

.logo {
  position: absolute; /* Position the logo */
  top: 0px; /* Adjust the top position */
  left: 0px; /* Adjust the left position */
  width: 150px; /* Adjust the width of the logo */
  height: auto; /* Maintain aspect ratio */
}

.icon {
  height: 50%;
}

.vertical-nav {
  position: fixed; /* Fix the navigation section */
  top: 0; /* Align it to the top of the viewport */
  left: 0; /* Align it to the left of the viewport */
  height: 100vh; /* Make it span the entire viewport height */
  width: 150px;
  background-color: #f0f0f0;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.vertical-nav button {
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 150px;
  margin-bottom: 0px;
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
  margin-left: 10px; /* Adjust the left margin to accommodate the navigation */
  margin-top: 125px;
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
  margin-top: 50px;
}

.large-buttons button {
  flex: 1;
  padding: 10px 10px;
  font-size: 35px;
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
