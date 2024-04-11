<template>
  <div class="ac" v-if="isRegistered">
    <h2 :style="{ color: 'red' }"><i> Registration email sent to </i></h2> <p><i>{{ account.email }}</i></p>
    <div>
    <br>
    <RouterLink to="/login">
      <input type="submit" value="Return to login page">
    </RouterLink>
    </div>
  </div>
  <div class="ac" v-if="!isRegistered">
    <form class="create-account-form" @submit.prevent="handleSubmit">
      <h1>Create New Account</h1>
      <div class="form-group">
        <label for="email">Enter Email:</label>
        <input type="email" id="email" v-model="account.email" required>
      </div>
      <div class="form-group">
        <label for="username">Enter Username:</label>
        <input type="text" id="username" v-model="account.username" required>
      </div>
      <div class="form-group">
        <label for="password">Enter Password:</label>
        <input type="password" id="password" v-model="account.password" required>
      </div>
      <input type="submit" value="Create Account">
    </form>
  </div>
</template>

<script>

import { registerUser } from '@/services/API';
import { RouterLink } from 'vue-router';



export default {
  data() {
    return {
      
      isRegistered : false,

      account: {
        email: '',
        username: '',
        password: '',
      }
        
    };
  },
  methods: {
    async handleSubmit() {
    try {

      this.isRegistered = true;

      const { email, username, password } = this.account;
      console.log(this.account);

      const response = await registerUser(email, username, password);
      

      console.log('User registered successfully:', response);
      // Optionally, you can redirect or show a success message

      

    } catch (error) {
      console.error('Error registering user:', error.message);
      // Optionally, show an error message to the user
    }
  }
}
}

</script>
  
  <style>
  .ac {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 20px;
  }
  
  .create-account-form {
    width: 500px;
    padding: 40px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input[type="email"],
  input[type="text"],
  input[type="password"],
  input[type="checkbox"] {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
  
  input[type="submit"] {
    width: 100%;
    padding: 8px;
    background-color: #fa8686;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }
  
  input[type="submit"]:hover {
    background-color: #ff0000;
  }
  
  .checkbox-group {
    display: flex;
    align-items: center;
  }
  
  .checkbox-group label {
    margin-right: 20px;
  }
  </style>
  