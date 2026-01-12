<template>
  <div class="home">
    <nav class="navbar">
      <div class="nav-container">
        <h1 class="logo">KinetixPro</h1>
        <div class="nav-actions">
          <button @click="handleLogout" class="btn-logout">Logout</button>
        </div>
      </div>
    </nav>

    <div class="container">
      <div class="header">
        <h2>Welcome to KinetixPro</h2>
        <p>Your social media platform</p>
      </div>

      <div class="posts-grid">
        <div class="post-card" v-for="post in posts" :key="post.id">
          <img :src="post.image" alt="Post image" />
          <div class="post-info">
            <h3>{{ post.title }}</h3>
            <p>{{ post.caption }}</p>
            <router-link :to="`/post/${post.id}`" class="btn-view">View Details</router-link>
          </div>
        </div>
      </div>

      <div v-if="posts.length === 0" class="empty-state">
        <p>No posts yet. Start sharing!</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { authService } from '../services/auth';

const router = useRouter();
const posts = ref<any[]>([]);

const handleLogout = () => {
  authService.logout();
  router.push('/login');
};

onMounted(() => {
  // Sample data - replace with actual API call later
  posts.value = [];
});
</script>

<style scoped>
.home {
  min-height: 100vh;
  background: #f5f5f5;
}

.navbar {
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem 0;
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 36px;
  font-weight: 700;
}

.btn-logout {
  padding: 14px 32px;
  background: #ff4757;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s;
}

.btn-logout:hover {
  background: #ee5a6f;
  transform: translateY(-2px);
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 60px 30px;
}

.header {
  text-align: center;
  margin-bottom: 60px;
}

.header h2 {
  font-size: 42px;
  color: #333;
  margin-bottom: 12px;
}

.header p {
  color: #666;
  font-size: 22px;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 32px;
}

.post-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.post-card:hover {
  transform: translateY(-4px);
}

.post-card img {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.post-info {
  padding: 24px;
}

.post-info h3 {
  margin-bottom: 12px;
  color: #333;
  font-size: 20px;
}

.post-info p {
  color: #666;
  margin-bottom: 16px;
  font-size: 16px;
}

.btn-view {
  display: inline-block;
  padding: 12px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  transition: transform 0.2s;
}

.btn-view:hover {
  transform: scale(1.05);
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #999;
  font-size: 18px;
}
</style>
