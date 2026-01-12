<template>
  <div class="login-container">
    <div class="login-card">
      <h1>{{ isLogin ? 'Login' : 'Register' }}</h1>
      
      <form @submit.prevent="handleSubmit">
        <div v-if="!isLogin" class="form-group">
          <label for="username">Username</label>
          <input 
            type="text" 
            id="username" 
            v-model="formData.username" 
            placeholder="Masukkan username"
            required
          />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input 
            type="email" 
            id="email" 
            v-model="formData.email" 
            placeholder="Masukkan email"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input 
            type="password" 
            id="password" 
            v-model="formData.password" 
            placeholder="Masukkan password"
            required
          />
        </div>

        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        <div v-if="successMessage" class="success-message">
          {{ successMessage }}
        </div>

        <button type="submit" class="btn-submit" :disabled="loading">
          {{ loading ? 'Loading...' : (isLogin ? 'Login' : 'Register') }}
        </button>
      </form>

      <div class="toggle-mode">
        <p v-if="isLogin">
          Belum punya akun? 
          <a @click="toggleMode" href="#">Register di sini</a>
        </p>
        <p v-else>
          Sudah punya akun? 
          <a @click="toggleMode" href="#">Login di sini</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import authService from '../services/auth';

const router = useRouter();
const isLogin = ref(true);
const loading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');

const formData = ref({
  username: '',
  email: '',
  password: ''
});

const toggleMode = () => {
  isLogin.value = !isLogin.value;
  errorMessage.value = '';
  successMessage.value = '';
  formData.value = {
    username: '',
    email: '',
    password: ''
  };
};

const handleSubmit = async () => {
  loading.value = true;
  errorMessage.value = '';
  successMessage.value = '';

  try {
    let result;
    
    if (isLogin.value) {
      result = await authService.login(formData.value.email, formData.value.password);
    } else {
      result = await authService.register(
        formData.value.username,
        formData.value.email,
        formData.value.password
      );
    }

    if (result.success) {
      successMessage.value = isLogin.value ? 'Login berhasil!' : 'Register berhasil!';
      setTimeout(() => {
        router.push('/');
      }, 1000);
    } else {
      errorMessage.value = result.message;
    }
  } catch (error) {
    errorMessage.value = 'Terjadi kesalahan. Silakan coba lagi.';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-card {
  background: white;
  padding: 50px;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 480px;
}

h1 {
  text-align: center;
  margin-bottom: 40px;
  color: #333;
  font-size: 36px;
}

.form-group {
  margin-bottom: 24px;
}

label {
  display: block;
  margin-bottom: 10px;
  color: #555;
  font-weight: 500;
  font-size: 16px;
}

input {
  width: 100%;
  padding: 16px 18px;
  border: 2px solid #e1e4e8;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #667eea;
}

.error-message {
  background: #fee;
  color: #c33;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 16px;
}

.success-message {
  background: #efe;
  color: #3c3;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 16px;
}

.btn-submit {
  width: 100%;
  padding: 18px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.toggle-mode {
  text-align: center;
  margin-top: 24px;
  color: #666;
  font-size: 16px;
}

.toggle-mode a {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  cursor: pointer;
  font-size: 16px;
}

.toggle-mode a:hover {
  text-decoration: underline;
}
</style>
