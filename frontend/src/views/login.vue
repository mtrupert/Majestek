<template>
  <div class="bg">
    <form class="login-form" @submit.prevent="login">
      <h1>Login</h1>
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="email" id="username" v-model="credentials.username" required>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="credentials.password" required>
      </div>
      <input type="submit" value="Login">
      <button type="button" @click="forgotpassword" class="text-button">Forgot Password?</button>
    </form>
    <div class="account-creation">
    <button @click="createAccount" class="create-account">Create an Account</button>
    </div>
  </div>
</template>

<script>
export default {
data() {
  return {
    loginForm: {
      email: '',
      password: '',
    },

    //Test credentials
    testUser: {
      email: 'test@example.com',
      password: 'password123',
    }
  }
},
methods: {
  handleLogin() {
    // Here you'd typically make an API call to your authentication service
    if (this.loginForm.email == this.testUser.email && this.loginForm.password == this.testUser.password){
      console.log('Login Successful');
    

    localStorage.setItem('authToken', 'your_simulated_token_here');

    //redirect to main page, which is app.vue
    this.$router.push('/');
    } else {
      //Handle login failure
      alert('Invalid credentials');
      console.log('Login failed');
    }
  }
}
}
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

  
