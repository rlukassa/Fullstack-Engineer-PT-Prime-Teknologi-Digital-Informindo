<template>
  <div class="detail-post">
    <nav class="navbar">
      <div class="nav-container">
        <router-link to="/" class="back-link">← Back to Home</router-link>
        <h1 class="logo">KinetixPro</h1>
      </div>
    </nav>

    <div class="container">
      <div class="post-detail" v-if="post">
        <div class="post-image">
          <img :src="post.image" alt="Post image" />
        </div>
        <div class="post-content">
          <h2>{{ post.title }}</h2>
          <p class="post-caption">{{ post.caption }}</p>
          <div class="post-meta">
            <span>👤 {{ post.author }}</span>
            <span>❤️ {{ post.likes }} likes</span>
            <span>💬 {{ post.comments }} comments</span>
          </div>
        </div>
      </div>

      <div v-else class="loading">
        <p>Loading post...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const post = ref<any>(null);

onMounted(() => {
  const postId = route.params.id;
  // Sample data - replace with actual API call later
  post.value = {
    id: postId,
    title: 'Sample Post',
    caption: 'This is a sample post detail page.',
    image: 'https://via.placeholder.com/600x400',
    author: 'User',
    likes: 0,
    comments: 0
  };
});
</script>

<style scoped>
.detail-post {
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
  gap: 30px;
  align-items: center;
}

.back-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  font-size: 18px;
  transition: color 0.3s;
}

.back-link:hover {
  color: #764ba2;
}

.logo {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 36px;
  font-weight: 700;
}

.container {
  max-width: 1000px;
  margin: 60px auto;
  padding: 0 30px;
}

.post-detail {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.post-image img {
  width: 100%;
  height: 500px;
  object-fit: cover;
}

.post-content {
  padding: 40px;
}

.post-content h2 {
  font-size: 40px;
  color: #333;
  margin-bottom: 20px;
}

.post-caption {
  color: #666;
  font-size: 20px;
  line-height: 1.7;
  margin-bottom: 32px;
}

.post-meta {
  display: flex;
  gap: 32px;
  padding-top: 32px;
  border-top: 1px solid #eee;
  font-size: 18px;
  color: #666;
}

.loading {
  text-align: center;
  padding: 60px 20px;
  color: #999;
  font-size: 18px;
}
</style>
