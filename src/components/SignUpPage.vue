<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { RouterLink, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { showToast } from '@/toastutiles';

// Initialize the router and toast
const router = useRouter();
const toast = useToast();

// Reactive state for form inputs
const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

// Handle form submission
const handleSubmit = async () => {
  if (password.value !== confirmPassword.value) {
    showToast(toast,'Error','Password Do Not Match!!')
    return;
  }

  // Define formData within the function scope
  const formData = {
    name: name.value,
    email: email.value,
    password: password.value,
  };

  try {
    // Send the POST request to the signup API
    const response = await axios.post('http://localhost:3000/user', formData);
    console.log(response);

    if (response.status === 201) {
      console.log('Signup successful:', response.data);
      showToast(toast,'Success','Signup successful!!')

      // Store user info in local storage
      localStorage.setItem("user-info", JSON.stringify(response.data));

      // Redirect to home page after successful signup
      router.push('/');
    }
  } catch (error) {
    showToast(toast,'Error','Error during signup. Please try again.')
  }
};

onMounted(() => {
  const user = localStorage.getItem('user-info');
  if (user) {
    router.push('/'); // Redirect to home if user is already logged in
  }
});
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-lg sm:p-6 md:p-8 lg:p-10">
      <h2 class="text-2xl font-semibold text-center text-gray-800 mb-6">Sign Up</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-600">Full Name</label>
          <input
            v-model="name"
            type="text"
            id="name"
            placeholder="Enter your full name"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-600">Email Address</label>
          <input
            v-model="email"
            type="email"
            id="email"
            placeholder="Enter your email"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-600">Password</label>
          <input
            v-model="password"
            type="password"
            id="password"
            placeholder="Enter your password"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div class="mb-4">
          <label for="confirmPassword" class="block text-sm font-medium text-gray-600">Confirm Password</label>
          <input
            v-model="confirmPassword"
            type="password"
            id="confirmPassword"
            placeholder="Confirm your password"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div class="flex justify-center">
          <button
            type="submit"
            class="w-full py-3 px-4 bg-blue-500 text-white rounded-md text-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </div>
      </form>
      <p class="text-center text-sm text-gray-600 mt-4">
        Already have an account? 
        <RouterLink to="/login" class="text-blue-500 hover:text-blue-600">Log in</RouterLink>
      </p>
    </div>
  </div>
</template>
