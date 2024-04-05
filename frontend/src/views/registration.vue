<template>
    <div class="ac">
      <form class="create-account-form" @submit.prevent="createAccount">
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
        <div class="form-group">
          <label>Are you a student or faculty member?</label>
          <div class="radio-group">
            <label><input type="radio" v-model="account.role" value="student" required> Student</label>
            <label><input type="radio" v-model="account.role" value="faculty" required> Faculty</label>
          </div>
        </div>
        <input type="submit" value="Create Account">
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        account: {
          email: '',
          username: '',
          password: '',
          role: '' // This will hold the selected role (student or faculty)
        }
      };
    },
    methods: {
      createAccount() {
        // Implement your create account logic here
        console.log("Create account with:", this.account);
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
  