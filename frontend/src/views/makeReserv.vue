<template>
    <div class="form-container">
      <form @submit.prevent="submitForm">
        <div class="column">
          <label for="reservationType">Select Reservation Type:</label>
          <select id="reservationType" v-model="selectedType" @change="updateDeviceList">
            <option disabled value="">Please choose one</option>
            <option value="locker">Locker</option>
            <option value="laptop">Laptop</option>
            <option value ="accessory">Accessories</option>
          </select>
        </div>
        <div class="column">
          <label for="deviceList">Device List:</label>
          <select id="deviceList" v-model="selectedDevice">
            <option disabled value="">Select a device</option>
            <option 
            v-if="selectedType === 'laptop'" 
            v-for="device in devices" :key="device" :value="device">{{ device }}
            </option>
            <option 
            v-if="selectedType === 'locker'" 
            v-for="device in devices" :key="device" :value="device">{{ device }}
            </option>
            <option 
            v-if="selectedType === 'accessory'" 
            v-for="device in devices" :key="device" :value="device">{{ device }}
            </option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  </template>
  
  <script>
  import { getAvailableLaptops } from '@/services/API';
  export default {
  mounted(){},
  data() {
    return {
      selectedType: '',
      selectedDevice: '',
      devices: [],
    };
  },
  methods: {
    async updateDeviceList() {
      if (this.selectedType) {
        try {
          const response = await getAvailableLaptops();
          this.devices = response.data;
          this.selectedDevice = ''; // Reset selected device when type changes
        } catch (error) {
          console.error("Failed to fetch devices:", error);
          this.devices = [];
        }
      }
    },
      submitForm() {
        console.log(`Selected Type: ${this.selectedType}, Selected Device: ${this.selectedDevice}`);
        // Implement form submission logic here
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
  