<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import axios from 'axios';
import { showToast } from '@/toastutiles';

// Initialize the router and toast
const router = useRouter();
const toast = useToast();

// Reactive state for form inputs
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

// Handle form submission
const handleSubmit = async () => {
  if (!email.value || !password.value) {
    showToast(toast, 'error', 'Please enter both email and password!');
    return;
  }

  try {
    const response = await axios.get(`http://localhost:3000/user?email=${email.value}&password=${password.value}&confirmPassword=${confirmPassword.value}`);
    if (response.status === 200 && response.data.length > 0) {
      localStorage.setItem('user-info', JSON.stringify(response.data[0]));
      router.push('/');
      showToast(toast, 'success', 'Login successful!');
    } else {
      showToast(toast, 'error', 'Invalid credentials. Please try again.');
    }
  } catch (error) {
    showToast(toast, 'error', 'Error during login. Please try again.');
  }
};

onMounted(() => {
  const user = localStorage.getItem('user-info');
  if (user) {
    router.push('/');
  }
});
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-lg sm:p-6 md:p-8 lg:p-10">
      <h2 class="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h2>
      <form @submit.prevent="handleSubmit">
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
            Login
          </button>
        </div>
      </form>
      <p class="text-center text-sm text-gray-600 mt-4">
        Don't have an account? 
        <RouterLink to="/signup" class="text-blue-500 hover:text-blue-600">Sign Up</RouterLink>
      </p>
    </div>
  </div>
</template>
