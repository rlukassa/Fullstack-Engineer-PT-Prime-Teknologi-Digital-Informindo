<script setup lang="ts">
import { authService } from '../services/auth';
import Sidebar from '../components/Sidebar.component.vue';
</script>

<template>
  <div class="messages-page">
    <Sidebar />
    
    <main class="main-content">
      <div class="container">
        <div class="header">
          <h2>Messages</h2>
          <p class="subtitle">@{{ authService.getUsername() || 'user' }}</p>
        </div>

        <!-- Coming Soon State -->
        <div class="coming-soon-state">
          <div class="coming-soon-icon">
            <i class="fas fa-envelope"></i>
          </div>
          <h3>Coming Soon!</h3>
          <p>We're working hard to bring you an amazing messaging experience.</p>
          <p class="sub-text">Stay tuned for updates!</p>
          <div class="progress-indicator">
            <div class="progress-bar"></div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.messages-page {
  display: flex;
  min-height: 100vh;
  background: #f5f8fa;
}

.main-content {
  flex: 1;
  margin-left: 275px;
  border-right: 1px solid #e1e8ed;
  background: #fff;
  min-height: 100vh;
}

.container {
  width: 100%;
}

.header {
  position: sticky;
  top: 0;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  padding: 12px 16px;
  border-bottom: 1px solid #e1e8ed;
  z-index: 10;
}

.header h2 {
  font-size: 20px;
  font-weight: 800;
  color: #0f1419;
  margin: 0;
}

.header .subtitle {
  font-size: 13px;
  color: #657786;
  margin: 0;
}

.coming-soon-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;
}

.coming-soon-icon {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #1da1f2 0%, #0d8bd9 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  animation: pulse 2s ease-in-out infinite;
}

.coming-soon-icon i {
  font-size: 42px;
  color: white;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(29, 161, 242, 0.4);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 0 20px rgba(29, 161, 242, 0);
  }
}

.coming-soon-state h3 {
  font-size: 28px;
  font-weight: 800;
  color: #0f1419;
  margin: 0 0 12px 0;
}

.coming-soon-state p {
  font-size: 16px;
  color: #657786;
  margin: 0 0 8px 0;
  max-width: 320px;
}

.coming-soon-state .sub-text {
  font-size: 14px;
  color: #1da1f2;
  font-weight: 600;
}

.progress-indicator {
  width: 200px;
  height: 6px;
  background: #e1e8ed;
  border-radius: 3px;
  margin-top: 24px;
  overflow: hidden;
}

.progress-bar {
  width: 60%;
  height: 100%;
  background: linear-gradient(90deg, #1da1f2 0%, #0d8bd9 100%);
  border-radius: 3px;
  animation: loading 2s ease-in-out infinite;
}

@keyframes loading {
  0% {
    width: 20%;
  }
  50% {
    width: 80%;
  }
  100% {
    width: 20%;
  }
}

/* Responsive */
@media (max-width: 1280px) {
  .main-content {
    margin-left: 88px;
  }
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
    margin-bottom: 60px;
    max-width: 100%;
  }
  
  .coming-soon-icon {
    width: 80px;
    height: 80px;
  }
  
  .coming-soon-icon i {
    font-size: 32px;
  }
  
  .coming-soon-state h3 {
    font-size: 24px;
  }
}
</style>
