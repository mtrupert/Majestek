<template>
    <div class="form-container">
      <form @submit.prevent="submitForm">
        <div class="column">
          <label for="reservationType">Select Reservation Type:</label>
          <select id="reservationType" v-model="selectedType" @change="updateDeviceList">
            <option disabled value="">Please choose one</option>
            <option value="locker">Locker</option>
            <option value="laptop">Laptop</option>
          </select>
        </div>
        <div class="column">
          <label for="deviceList">Device List:</label>
          <select id="deviceList" v-model="selectedDevice">
            <option disabled value="">Select a device</option>
            <option v-for="device in devices" :key="device" :value="device">{{ device }}</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedType: '',
        selectedDevice: '',
        devices: [],
        deviceOptions: {
          locker: ["Locker A", "Locker B", "Locker C"],
          laptop: ["Laptop X", "Laptop Y", "Laptop Z"]
        }
      };
    },
    methods: {
      updateDeviceList() {
        this.devices = this.deviceOptions[this.selectedType] || [];
        this.selectedDevice = ''; // Reset selected device when type changes
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
  