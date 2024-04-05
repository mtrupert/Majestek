import { defineStore } from "pinia";
import { loginUser } from "@/services/API";
import { jwtDecode } from "jwt-decode";

export const useLoggedInUserStore = defineStore({
    id: 'loggedInUser',
    state: () => {
        return {
            id: "",
            name: "",
            role: "",
            isLoggedIn: false
        }
    },
    actions: {
        async login(email, password) {
            try {
            const token = await loginUser(email, password);
            const decodedToken = jwtDecode(token);
            this.$patch({
                isLoggedIn: true,
                id: decodedToken.user_id,
                name: decodedToken.user_name,
                role: decodedToken.user_role
            });


            console.log(decodedToken);
            this.$route.push({
                path: '/',
                query: {
                    id: decodedToken.user_id,
                    name: decodedToken.user_name,
                    role: decodedToken.user_role
                }
            });
            console.log("Login Successful")
            return state
            } catch (error) {
                console.log(error.message)
            }
        },
        logout() {
            // Reset value after user log out
            this.$patch({
              name: "",
              role: "",
              isLoggedIn: false
            });
            this.$router.push("/login");
            console.log("You have been logged out!")
          },


    },
    getters: {
        loginName(state) {
            return state.name
        }
    }   

    
});