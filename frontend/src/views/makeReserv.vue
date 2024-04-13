<template>
  <div class="form-container">
    <form @submit.prevent="submitForm">
      <div class="column">
        <label for="reservationType">Select Reservation Type:</label>
        <select id="reservationType" v-model="selectedType" @change="updateDeviceList">
          <option disabled value="">Please choose one</option>
          <option value="accessory">Accessories</option>
          <option value="laptop">Laptop</option>
          <option value="locker">Locker</option>
        </select>
      </div>
      <div class="column">
        <label for="deviceList">Device List:</label>
        <select id="deviceList" v-model="selectedDevice">
          <option disabled value="">Select a device</option>
          <option v-if="selectedType === 'laptop'" v-for="laptop in laptops" :value="laptop.equipment_id">{{ laptop.equipment_name }}</option>
          <option v-if="selectedType === 'accessory'" v-for="accessory in accessories" :value="accessory.equipment_id">{{ accessory.equipment_name }}</option>
          <option v-if="selectedType === 'locker'" v-for="locker in lockers" :value="locker.locker_id">{{ locker.serial_num }}</option>
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>

import { useLoggedInUserStore } from '@/store/loggedInUsers';
import { getAvailableLaptops, getAvailableAccessories, getAvailableLockers, reserveLocker, reserveEquipment } from '@/services/API';
import { onMounted, ref } from 'vue';


export default {
  mounted() {
    getAvailableLaptops().then(response =>{
      this.laptops = response
    })
    getAvailableAccessories().then(response=>{
      this.accessories = response
    })
    getAvailableLockers().then(response=>{
      this.lockers = response
    })
    
    console.log(this.user_id)
    
  },
  setup() {
    const store = useLoggedInUserStore();
    const user_id = ref(store.id)




    return {
      store,
      user_id
    }
  },
  data() {
    return {
      selectedType: '',
      selectedDevice: '',
      laptops: [],
      accessories: [],
      lockers: []
    };
  },
  methods: {
    async submitForm() {
      console.log(`Selected Type: ${this.selectedTy}`);
      // Implement form submission logic here
      if (this.selectedType = "laptop") {
        await reserveEquipment(this.user_id, this.selectedDevice).then(response=>{
          console.log(response);
          this.$router.push('/');
        })
      }

      else if (this.selectedType = "accessory") {
        await reserveEquipment(this.user_id, this.selectedDevice).then(response=>{
          console.log(response);
          this.$router.push('/');
        })
      }

      else if (this.selectedType = "locker") {
        await reserveLocker(this.user_id, this.selectedDevice).then(response=>{
          console.log(response);
          this.$router.push('/');
        })
      }
      else {
        console.log("No option selected.")
      }
      
    }

     

  }
}
</script>

<style>
.form-container {
display: flex;
flex-direction: column;
padding: 20px;
width: 90vw; 
max-width: 1200px;
margin: 40px auto; 
font-size: 1.5rem;
}

.column {
display: flex;
justify-content: space-between;
align-items: center;
padding: 15px; 
margin: 0 0 20px 0; 
}

label, select {
margin: 0 10px;
}
label {
white-space: nowrap;
margin-right: 20px; 
}
select {
width: auto;
padding: 12px; 
border-radius: 4px;
border: 1px solid #ccc;
flex-grow: 1;
font-size: 1.5rem; 
}

button[type="submit"] {
  display: block; 
  width: 50%;
  margin: 0 auto; 
  padding: 25px ;
  background-color: #fa8686;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 2.2rem;
}

button[type="submit"]:hover {
  background-color: #ff0000;
}
</style>