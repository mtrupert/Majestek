<template>
    <div class="container">
        <!-- Step 1: Enter email address -->
        <div v-if="!resetStep" class="form-container">
            <h1>Forgot Password</h1>
            <form @submit.prevent="sendResetLink">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="email" placeholder="Enter your email" required>
                <button type="submit">Send Reset Link</button>
            </form>
        </div>

        <!-- Step 2: Reset password -->
        <div v-if="resetStep === 1" class="form-container">
            <h1>Reset Password</h1>
            <form @submit.prevent="resetPassword">
                <label for="newPassword">New Password:</label>
                <input type="password" id="newPassword" v-model="newPassword" placeholder="Enter your new password" required>
                <label for="confirmPassword">Confirm Password:</label>
                <input type="password" id="confirmPassword" v-model="confirmPassword" placeholder="Confirm your new password" required>
                <button type="submit">Reset Password</button>
            </form>
        </div>
    </div>
</template>

<!--This is just a possible start for the functionality of the reset password process. Can remove if needed.-->
<script>
export default {
  data() {
    return {
      email: '',
      newPassword: '',
      confirmPassword: '',
      resetStep: 0  // 0 for email input step, 1 for reset password step
    };
  },
  methods: {
    sendResetLink() {
      // Send reset link logic goes here (e.g., send email with reset link)
      // Assuming the link redirects to the same page and sets resetStep to 1
      this.resetStep = 1;
    },
    resetPassword() {
      // Password reset logic goes here
      if (this.newPassword !== this.confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      // Passwords match, continue with reset logic
      console.log('Reset password logic...');
    }
  }
};
</script>

<!--Adjust the styling of the page here-->
<style scoped>
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .form-container {
        max-width: 60vw;
        display: flex;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    h1 {
        text-align: center;
    }

    form {
        display: flex;
        flex-direction: column;
    }

    label {
        display: block;
        margin-bottom: 5px;
    }

    input {
        padding: 8px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    button {
        padding: 10px 20px;
        background-color: #ff6666; /* Red button */
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

        button:hover {
            background-color: #e60000; /* Darker red on hover */
        }
</style>

