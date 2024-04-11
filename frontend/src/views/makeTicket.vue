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
            <textarea v-model="issueDescription" class="issue-textarea"></textarea>
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

<style scoped>
.make-ticket-container {
  width: 500px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 30px;
  margin-top: 15px;
  
}

label {
  font-weight: bold;
}

select,
textarea {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.issue-textarea{
    resize: none;
    height: 150px;
}

.submit-button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>