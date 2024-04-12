<template>
  <div>
    <h1 style="color: black;">View Inventory</h1>
    <div>
      <button @click="fetchLockerData">Fetch Locker Data</button>
      <button @click="fetchEquipmentData">Fetch Equipment Data</button>
    </div>
    <table v-if="showLockerTable" class="inventory-table">
      <thead>
        <tr>
          <th> Locker ID</th>
          <th> Serial Number</th>
          <th @click="sortBy('avail_status')">Availability</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in sortedLockerInventory" :key="index">
          <td>{{ item.locker_id }}</td>
          <td>{{ item.serial_num }}</td>
          <td>{{ item.avail_status }}</td>
          <td>{{ item.room_id }}</td>
        </tr>
      </tbody>
    </table>
    <table v-if="showEquipmentTable" class="inventory-table">
      <thead>
        <tr>
          <th> Equipment ID</th>
          <th> Serial Number</th>
          <th @click="sortBy('equipment_type_id')">Equipment Type</th>
          <th> Equipment Name</th>
          <th @click="sortBy('equipment_status_id')">Availability</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in sortedEquipmentInventory" :key="index">
          <td>{{ item.equipment_id }}</td>
          <td>{{ item.serial_number }}</td>
          <td>{{ getEquipmentType(item.equipment_type_id) }}</td>
          <td>{{ item.equipment_name }}</td>
          <td>{{ item.equipment_status_id === 1 ? 'Available' : 'Unavailable' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getAllLockers, getAllEquipment } from '../services/API'; // Import the necessary API functions

export default {
  data() {
    return {
      lockerInventory: [],
      equipmentInventory: [],
      showLockerTable: false,
      showEquipmentTable: false,
      sortKey: '',
      sortOrders: {}
    }
  },
  methods: {
    async fetchLockerData() {
      try {
        // Fetch locker data
        this.lockerInventory = await getAllLockers();
        // Set the flag to show the locker table and hide the equipment table
        this.showLockerTable = true;
        this.showEquipmentTable = false;
      } catch (error) {
        console.error('Error fetching locker data:', error);
      }
    },
    async fetchEquipmentData() {
      try {
        // Fetch equipment data
        const response = await getAllEquipment();
        this.equipmentInventory = response.result; // Assuming response.result contains equipment data
        // Set the flag to show the equipment table and hide the locker table
        this.showEquipmentTable = true;
        this.showLockerTable = false;
      } catch (error) {
        console.error('Error fetching equipment data:', error);
      }
    },
    getEquipmentType(typeId) {
      return typeId === 1 ? 'Laptop' : typeId === 2 ? 'Accessory' : 'Unknown'; // Update the rendering based on the type ID
    },
    sortBy(key) {
      this.sortKey = key;
      this.sortOrders[key] = !this.sortOrders[key];
    }
  },
  computed: {
    sortedLockerInventory() {
      const key = this.sortKey;
      const order = this.sortOrders[key] ? 1 : -1;
      return this.lockerInventory.slice().sort((a, b) => {
        return order * (a[key] > b[key] ? 1 : -1);
      });
    },
    sortedEquipmentInventory() {
      const key = this.sortKey;
      const order = this.sortOrders[key] ? 1 : -1;
      return this.equipmentInventory.slice().sort((a, b) => {
        return order * (a[key] > b[key] ? 1 : -1);
      });
    }
  }
}
</script>
