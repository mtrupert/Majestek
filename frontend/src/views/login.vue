<template>
  <div class="bg">
    <form class="login-form" @submit.prevent="store.login(username, password)">
      <h1>Login</h1>
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="email" id="username" v-model="username" required>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <input type="submit" value="Login">
      <button type="button" @click="forgotpassword" class="text-button">Forgot Password?</button>
    </form>
    <div class="account-creation">
      <router-link to="/registration">
        <button @click="createAccount" class="create-account">Create an Account</button>
      </router-link>
    </div>
  </div>
</template>

<script>

import { useLoggedInUserStore } from "../store/loggedInUsers";


export default {
setup() {
  const store = useLoggedInUserStore();
  return {
    store
  }
},

data() {
  return {
    username: "",
    password: "",

  } 
},

};
</script>

<style>
.bg {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px; 
}

.login-form {
  width: 500px; 
  padding: 40px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px; 
}

.text-button {
  background: none;
  border: none;
  color: #ff0000; 
  cursor: pointer;
  text-decoration: none; /* Remove default underline */
  margin-top: 10px; /* Add spacing between the buttons */
}

.text-button:hover {
  text-decoration: underline; /* Underline on hover */
}

.account-creation {
  width: 500px; 
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px; 
  display: flex;
  justify-content: center; 
  align-items: center; 
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="email"],
input[type="password"] {
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

.create-account {
  width: 100%;
  max-width: 400px;
  padding: 12px;
  background-color: #4aa1ff;
  color: white;
  padding: 8px 15px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.create-account:hover {
  background-color: #0076f4;
}
</style>

  
