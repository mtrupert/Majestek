<template>
    <h2 style="color: black;">View Inventory</h2>
    <div>
        <label for="sortSelect">Sort by:</label>
        <select id="sortSelect" v-model="sortOption">
            <option value="name">Name</option>
            <option value="availability">Availability</option>
        </select>
    </div>
    <table class="inventory-table">
        <thead>
            <tr>
                <th @click="sortBy('id')">Student ID</th>
                <th @click="sortBy('name')">Name</th>
                <th @click="sortBy('serialNumber')">Serial Number</th>
                <th @click="sortBy('availability')">Availability</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in sortedInventory" :key="index">
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.serialNumber }}</td>
                <td>{{ item.available ? 'Available' : 'Unavailable' }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    data() {
        return {
            currentSection: 'make_reservation',
            inventory: [
                { id: '123', name: 'Laptop', serialNumber: 'ABC123', available: true },
                { id: '124', name: 'Locker', serialNumber: 'DEF456', available: false },
                { id: '126', name: 'Locker', serialNumber: 'GHI789', available: true },
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
        sortBy(option) {
            this.sortOption = option;
        }
    }
}
</script>