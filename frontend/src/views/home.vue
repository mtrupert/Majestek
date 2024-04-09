<template>
  <div class="home-container">
    
    <router-link to="/makereservation" class="home-button">Make a Reservation<img src="../assets/clipboard_icon.png" class="icon"></router-link>
    <router-link to="/viewreservations" class="home-button">View Device/Locker Reservation <img src="../assets/computer_icon.png" class ="icon"></router-link>   
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
    }
  }

</script>


<style scoped>
.home-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.home-button {
  display: block;
  width: 50%;
  padding: 5%;
  text-align: center;
  background-color: red;
  color: white;
  text-decoration: none;
  border: none;
  border-radius: 25px;
  font-size: 20px;
  line-height: 1.5;
  margin-right: 20px;
}

.home-button:hover {
  background-color: darkred; /* Change button color on hover */
}

.icon {
  height: 75%;
  margin-top: 50px;
}
</style>