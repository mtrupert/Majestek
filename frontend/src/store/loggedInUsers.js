import { defineStore } from "pinia";
import { loginUser } from "@/services/API";
import { jwtDecode } from "jwt-decode";
import { useLocalStorage } from "@vueuse/core";


export const useLoggedInUserStore = defineStore({
    id: 'loggedInUser',
    state: () => {
        return {
            id: null,
            user: null,
            role: null,
            isLoggedIn: false
        }
    },
    actions: {
        async login(email, password) {
            try {
            const token = await loginUser(email, password);
            const decodedToken = jwtDecode(token);
            
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('id', decodedToken.id );
            localStorage.setItem('name', decodedToken.name );
            localStorage.setItem('role', decodedToken.role );      

            this.user = decodedToken.name;
            this.isLoggedIn = true;
            this.id = decodedToken.id;
            this.role = decodedToken.role;
                
            console.log(this.user);



            console.log(decodedToken);
            this.$router.push({
                path: '/',
            });
            return 
            } catch (error) {
                console.log(error.message)
            }
        },
        logout() {
            // Reset value after user log out
            this.$patch({
              id: null,
              user: null,
              role: null,
              isLoggedIn: false
            });

            localStorage.removeItem('user');
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('role');
            localStorage.removeItem('id');

            this.$router.push("/login");
            console.log("You have been logged out!")
          },


    },
    getters: {
        currentUser() {
          return this.user;
        },
        isAuthenticated() {
          return this.isLoggedIn;
        },
        currentRole() {
            return this.role;
        },
        currentId() {
            return this.id;
        }
      }
    

    
});