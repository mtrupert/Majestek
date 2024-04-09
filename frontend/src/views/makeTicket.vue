<template>
    <div class="make-ticket-container">
        <h2>Send Support Ticket</h2>

        <!--Dropdown-->
        <div class="form-group">
            <label for="device">Select Device</label>
            <select id="device" v-model="selectedDevice">
                <option value="">- Please Select -</option>
                <option v-for="device in devices" :key="device.id" :value="device.id">{{ device.name }}</option>
            </select>
        </div>

        <!-- Describe Device Issue Text Area -->
        <div class="form-group">
            <label for="issue">Describe Device Issue:</label>
            <textarea id="issue" v-model="issueDescription" rows="4"></textarea>
        </div>

        <!-- Submit Ticket Button -->
        <button @click="submitTicket" class="submit-button">Submit Ticket</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selectedDevice: '',
            issueDescription: '',
            devices: [] //Device data goes here
        };
    },
    methods: {
        submitTicket() {
            // Validation
            if (!this.selectedDevice) {
                alert('Please select a device.');
                return;
            }
            if (!this.issueDescription.trim()) {
                alert('Please describe the issue.');
                return;
            }
        }
    }

}


</script>
