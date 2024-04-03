<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="loginForm.email" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="loginForm.password" required>
      </div>
      <button type="submit">Login</button>
    </form>
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

<style scoped>
body, html {
background-color: white; /* Change the background of the entire page to white */
margin: 0;
padding: 0;
}

.login-container {
max-width: 300px;
margin: auto;
margin-top: 100px;
padding: 20px;
border: 1px solid #ccc;
border-radius: 5px;
background-color: white; /* Ensure the login form background is white */
}

.login-container h1, label, button {
color: red; /* Change text color to red */
}

button {
width: 100%;
padding: 10px;
margin-top: 20px;
border: none;
border-radius: 5px;
background-color: red; /* Optionally, make the button red */
color: white; /* Change button text color to white for contrast */
cursor: pointer;
}

button:hover {
background-color: darkred; /* Darken the button on hover for a visual effect */
}
</style>

  
