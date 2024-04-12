import router from '@/router';
import axios from 'axios';
import { createRouter, createWebHistory } from "vue-router"


const baseURL = 'http://localhost:8080'; // Update this with your backend URL

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// POST requests
export async function createLocker(lockerData) {
  try {
    const response = await axiosInstance.post('/lockers/post', lockerData);
    return response.data;
  } catch (error) {
    console.error('Error creating locker:', error);
    throw error;
  }
}

export async function createEquipment(equipmentData) {
  try {
    const response = await axiosInstance.post('/equipment/post', equipmentData);
    return response.data;
  } catch (error) {
    console.error('Error creating equipment:', error);
    throw error;
  }
}

export async function createReservation(reservationData) {
  try {
    const response = await axiosInstance.post('/reservations/post', reservationData);
    return response.data;
  } catch (error) {
    console.error('Error creating reservation:', error);
    throw error;
  }
}

export async function createUser(userData) {
  try {
    const response = await axiosInstance.post('/users/post', userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export async function createTicket(ticketData) {
  try {
    const response = await axiosInstance.post('/ticket/post', ticketData);
    return response.data;
  } catch (error) {
    console.error('Error creating ticket:', error);
    throw error;
  }
}

// GET requests



export async function getReservationByUser(userId) {
  try {
    const response = await axiosInstance.get(`/reservation-user/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching reservations for user ${userId}:`, error);
    throw error;
  }
}

export async function getAvailableLaptops() {
  try {
    const response = await axiosInstance.get('/equipment/laptops');
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching laptops:', error);
    throw error;
  }
}

export async function getAvailableAccessories() {
  try {
    const response = await axiosInstance.get('/equipment/accessories');
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching accessories:', error);
    throw error;
  }
}

export async function getAllLockers() {
  try {
    const response = await axiosInstance.get('/lockers');
    return response.data;
  } catch (error) {
    console.error('Error fetching lockers:', error);
    throw error;
  }
}

export async function getAllEquipment() {
  try {
    const response = await axiosInstance.get('/equipment');
    return response.data;
  } catch (error) {
    console.error('Error fetching equipment:', error);
    throw error;
  }
}


// PUT requests
export async function updateUserInfo(userInfo) {
  try {
    const response = await axiosInstance.put(`/users/update/${userInfo.userId}`, userInfo);
    return response.data;
  } catch (error) {
    console.error('Error updating user info:', error);
    throw error;
  }
}

export async function updateEquipmentInfo(equipmentInfo) {
  try {
    const response = await axiosInstance.put(`/equipment/update/${equipmentInfo.equipmentId}`, equipmentInfo);
    return response.data;
  } catch (error) {
    console.error('Error updating equipment info:', error);
    throw error;
  }
}

// DELETE requests
export async function deleteTicket(ticketId) {
  try {
    const response = await axiosInstance.delete(`/ticket/delete/${ticketId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting ticket:', error);
    throw error;
  }
}

export async function deleteReservation(reservationId) {
  try {
    const response = await axiosInstance.delete(`/reservations/delete/${reservationId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting reservation:', error);
    throw error;
  }
}

export async function deleteLocker(lockerId) {
  try {
    const response = await axiosInstance.delete(`/lockers/delete/${lockerId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting locker:', error);
    throw error;
  }
}

export async function deleteUser(userId) {
  try {
    const response = await axiosInstance.delete(`/users/delete/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}



export async function getAllUsers() {
try {
  const response = await axiosInstance.get('/users');
  console.log(response.data)
  return response.data;
} catch (error) {
  console.error('Error fetching users:', error);
  throw error;
}
}

export async function loginUser(email, password) {
try {
  const response = await axiosInstance.post("/login", {
    email,
    password,
  });
  const token = response.data.token;
  return token
  
} catch (error) {
console.log(error.response.data.message)
}};

export async function getAllReservations() {
try {
  const response = await axiosInstance.get('/reservations');
  console.log(response.data);
  return response.data
} catch (error) {
  console.log(error);
}
}

export async function registerUser(email, username, password) {
try {
  const response = await axiosInstance.post('/register', {
    email: email,
    username: username,
    password: password
  });

  console.log(response)
  console.log("Email sent")
  
  this.$router.push("/login");
  return { message: "Check email for Verification" }
  
} catch (error) {
console.log(error.response.data.message)
}
};

export async function getAllTickets() {
try {
  const response = await axiosInstance.get('/ticket');
  return response.data;
} catch (error) {
  console.error('Error fetching tickets:', error);
  throw error;
}
}

export async function passwordLink(email, code) {
  const response = await axiosInstance.post('/forgot-password', {
    email: email,
    code: code
  });
    console.log(response)
    return 
 
}

export async function updatePassword(email, password) {
  const response = await axiosInstance.put('/users/password', {
    email: email,
    password, password 
  });
  console.log(response);
  return response
}

export function generateRandomSixDigitNumber() {
  // Generate a random number between 100000 (inclusive) and 999999 (inclusive)
  const randomNumber = Math.floor(Math.random() * 900000) + 100000;
  return randomNumber;
}
