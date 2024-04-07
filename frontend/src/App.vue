<template>
  <div id="main-page">
    <!-- Title Container -->
    <div class="title-container">
      <h1 class="page-title">UH IT Device Reservations </h1>
    </div>
    <!-- Vertical Navigation Section -->
    <div class="vertical-nav">
      <img src="./assets/UHLOGO.jpg" alt="Logo" class="logo">
      <!--Router Links-->
      <div class="routing-links">
        <router-link to="/view_inventory" tag="button" v-if='role =="Admin"'>View Inventory</router-link>
        <router-link to="/view_tickets" tag="button" v-if='role =="Admin"'>View Support Tickets</router-link>
        <router-link to="/send_ticket" tag="button">Send Support Ticket</router-link>
        <router-link to="/logout" tag="button">Logout</router-link>
      </div>
    </div>
  <div id="routerView">
    <!-- Main Area of Page -->
    <RouterView />
  </div>

    
    

    
</div>
  
</template>

<!-- Starting Script for inventory -->
<script>
import { RouterLink, RouterView } from 'vue-router';
import { useLoggedInUserStore } from './store/loggedInUsers'

export default {
  mounted() {
    const id = this.$route.query.id;
    const name = this.$route.query.name;
    const role = this.$route.query.role;

    // Use the state properties as needed
    console.log('User ID:', id);
    console.log('User Name:', name);
    console.log('User Role:', role);

    },
  setup() {
    const store = useLoggedInUserStore();

    const name = store.loginName
    return {
      store,
      name
    };
  }
}
// Ending Script for inventory
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  background-color: #f5f5f5; /* Light gray background */
}

#main-page {
  align-items: center;
}

#app {
  display: flex;
  min-height: 100vh; /* Make the app div span the entire viewport height */
  background-color: #f5f5f5; /* Light gray background */
}

#routerView {
  display: flex;
  align-items: center;
}

.title-container {
  background-color: red;
  text-align: center;
  padding: 10px 0; /* Adjust vertical padding */
  width: 100%; /* Make the container span the width of the page */
  box-sizing: border-box; /* Include padding in the width calculation */
  position: absolute;
  top: 0;
  left: 0;
  height: 1.2in; /* Set the height to 1 inch */
}

.page-title {
  margin: 0; /* Remove default margin */
  color: black; 
  font-size: 65px;
  font-family: Aptos, Calibri, sans-serif;
  font-weight: 370;
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

.routing-links {
  width: 100%;
  height: 75%;
  padding: 5px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  margin-top: 100px;
}

.routing-links a{
  display: block;
  padding: 10px;
  margin-bottom: 10px;
  text-align: center;
  border: 2px solid black; /* Add border around the router-link */
  border-radius: 5px; /* Optional: Add border radius for rounded corners */
  color: black;
  text-decoration: none;
}

.routing-links a:hover {
  background-color: lightgray;
}

.main-content {
  margin-left: 10px; /* Adjust the left margin to accommodate the navigation */
  margin-top: 125px;
  flex: 1;
  padding: 20px;
}

</style>
