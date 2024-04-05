<template>
  <div id="main-page">
    <!-- Title Container -->
    <div class="title-container">
      <h1 class="page-title">UH IT Device Reservations </h1>
    </div>
    <!-- Vertical Navigation Section -->
  <div class="vertical-nav" v-if="store.isLoggedIn">
      <img src="./assets/UHLOGO.jpg" alt="Logo" class="logo">
      <li>
        <RouterLink to="/viewinventory" v-if='store.role =="Student"'>
          <button>   View Invtentory    </button>
        </RouterLink>
      </li>
      <button @click="store.logout()">Logout</button>
      <div>
      {{ name }}
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
  },
  data() {
    return {
      currentSection: 'make_reservation',
      inventory: [
        { id: '123', name: 'Laptop', serialNumber: 'ABC123', available: true },
        { id: '124',name: 'Locker', serialNumber: 'DEF456', available: false },
        { id: '126',name: 'Locker', serialNumber: 'GHI789', available: true },
      ],
      sortOption: 'name'
    }
  },
  computed: {
    sortedInventory() {
      return this.inventory.slice().sort((a, b) => {
        if (this.sortOption === 'name') {
          return a.name.localeCompare(b.name);
        } else if (this.sortOption === 'serialNumber') {
          return a.serialNumber.localeCompare(b.serialNumber);
        } else if (this.sortOption === 'availability') {
          return a.available - b.available;
        }
      });
    }
  },
  methods: {
    navigate(section) {
      this.currentSection = section;
    },
    sortBy(option) {
      this.sortOption = option;
    }
  },
};
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
  background-color: #ff7575;
  color: #fff;
  border: 2px solid black;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.large-buttons button:hover {
  background-color: red;
}

</style>
