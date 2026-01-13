<script setup lang="ts"> 
import { ref, computed } from 'vue';
import { parseMarkdown, hasMarkdown } from '../utils/markdown';

const MAX_CHARS = 2000; // Increased for markdown content
const title = ref('');
const caption = ref('');
const imageFile = ref<File | null>(null);
const imagePreview = ref('');
const showPreview = ref(false);
const showMarkdownHelp = ref(false);

const charCount = computed(() => caption.value.length);
const charsRemaining = computed(() => `${charCount.value}/${MAX_CHARS}`);
const isOverLimit = computed(() => charCount.value > MAX_CHARS);
const canTweet = computed(() => title.value.trim().length > 0 && caption.value.trim().length > 0 && !isOverLimit.value);
const hasMarkdownContent = computed(() => hasMarkdown(caption.value));
const parsedCaption = computed(() => parseMarkdown(caption.value));

const emit = defineEmits(['post']);

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    imageFile.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

const removeImage = () => {
  imageFile.value = null;
  imagePreview.value = '';
};

const togglePreview = () => {
  showPreview.value = !showPreview.value;
};

const handleTweet = () => {
  if (!canTweet.value) return;
  
  emit('post', {
    title: title.value,
    caption: caption.value,
    imageUrl: imagePreview.value,
    imageFile: imageFile.value
  });
  
  // Reset form
  title.value = '';
  caption.value = '';
  imageFile.value = null;
  imagePreview.value = '';
  showPreview.value = false;
};
</script>

<template> 
  <div class="tweet-composer">
    <div class="composer-header">
      <span class="header-text">You are tweeting as yourself.</span>
      <button 
        v-if="hasMarkdownContent || caption.length > 0" 
        class="preview-toggle"
        :class="{ active: showPreview }"
        @click="togglePreview"
      >
        <svg v-if="!showPreview" viewBox="0 0 24 24" width="16" height="16">
          <path fill="currentColor" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
        </svg>
        <svg v-else viewBox="0 0 24 24" width="16" height="16">
          <path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
        </svg>
        {{ showPreview ? 'Edit' : 'Preview' }}
      </button>
    </div>

    <div class="composer-body">
      <input
        v-model="title"
        type="text"
        placeholder="What's happening?"
        class="title-input"
      />

      <textarea
        v-if="!showPreview"
        v-model="caption"
        placeholder="Add more details..."
        class="caption-input"
        :class="{ 'over-limit': isOverLimit }"
        rows="4"
      ></textarea>

      <div v-else class="markdown-preview" v-html="parsedCaption"></div>
      <div class="markdown-help-wrapper">
        <button class="markdown-help-btn" @click="showMarkdownHelp = !showMarkdownHelp">
          <svg viewBox="0 0 24 24" width="14" height="14">
            <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
          </svg>
          Markdown tips
        </button>
        
        <div v-if="showMarkdownHelp" class="markdown-help">
          <div class="help-item"><code>**bold**</code> → <strong>bold</strong></div>
          <div class="help-item"><code>*italic*</code> → <em>italic</em></div>
          <div class="help-item"><code>`code`</code> → <code>code</code></div>
          <div class="help-item"><code># Heading</code> → heading</div>
          <div class="help-item"><code>- item</code> → bullet list</div>
          <div class="help-item"><code>[text](url)</code> → link</div>
          <div class="help-item"><code>> quote</code> → blockquote</div>
        </div>
      </div>

      <div v-if="imagePreview" class="image-preview">
        <img :src="imagePreview" alt="Preview" />
        <button class="remove-image" @click="removeImage">
          <i class="fa-solid fa-circle-xmark"></i>
        </button>
      </div>
    </div>

    <div class="composer-footer">
      <div class="footer-left">
        <label class="image-upload-btn">
          <i class="far fa-image"></i>
          <input 
            type="file" 
            accept="image/*" 
            @change="handleImageUpload"
            hidden
          />
        </label>
      </div>

      <div class="footer-right">
        <span class="char-count" :class="{ 'over-limit': isOverLimit }">
          {{ charsRemaining }}
        </span>
        <div class="divider"></div>
        <button 
          class="btn-tweet"
          :disabled="!canTweet"
          @click="handleTweet"
        >
          Post!
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tweet-composer {
  background: #ffffff;
  border: 1px solid #eff3f4;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 16px;
}

/* Header */
.composer-header {
  padding-bottom: 12px;
  border-bottom: 1px solid #eff3f4;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-text {
  color: #536471;
  font-size: 14px;
}

.preview-toggle {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border: 1px solid #eff3f4;
  border-radius: 9999px;
  background: transparent;
  color: #536471;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.preview-toggle:hover {
  background: rgba(29, 155, 240, 0.1);
  border-color: #1d9bf0;
  color: #1d9bf0;
}

.preview-toggle.active {
  background: #1d9bf0;
  border-color: #1d9bf0;
  color: white;
}

.ai-link {
  color: #1d9bf0;
  font-size: 14px;
  text-decoration: none;
  margin-left: 4px;
}

.ai-link:hover {
  text-decoration: underline;
}

/* Body */
.composer-body {
  padding: 8px 0;
}

.title-input {
  width: 100%;
  border: none;
  outline: none;
  font-size: 20px;
  font-family: inherit;
  color: #0f1419;
  padding: 8px 0;
  line-height: 1.5;
  margin-bottom: 8px;
}

.title-input::placeholder {
  color: #536471;
}

.caption-input {
  width: 100%;
  border: none;
  outline: none;
  resize: none;
  font-size: 15px;
  font-family: inherit;
  color: #536471;
  padding: 8px 0;
  line-height: 1.5;
}

.caption-input::placeholder {
  color: #8899a6;
}

.caption-input.over-limit {
  color: #f4212e;
}

/* Image Preview */
.image-preview {
  position: relative;
  margin-top: 12px;
  border-radius: 16px;
  overflow: hidden;
}

.image-preview img {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 16px;
}

.remove-image {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  background: rgba(15, 20, 25, 0.75);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.remove-image:hover {
  background: rgba(15, 20, 25, 0.9);
}

/* Footer */
.composer-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #eff3f4;
}

.footer-left {
  display: flex;
  align-items: center;
}

.image-upload-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.2s;
  color: #1d9bf0;
  font-size: 18px;
}

.image-upload-btn:hover {
  background: rgba(29, 155, 240, 0.1);
}

.footer-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.char-count {
  color: #536471;
  font-size: 14px;
}

.char-count.over-limit {
  color: #f4212e;
}

.divider {
  width: 1px;
  height: 24px;
  background: #eff3f4;
}

.btn-tweet {
  padding: 8px 16px;
  background: #1d9bf0;
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-tweet:hover:not(:disabled) {
  background: #1a8cd8;
}

.btn-tweet:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Markdown Preview */
.markdown-preview {
  min-height: 80px;
  padding: 12px;
  background: #f7f9fa;
  border-radius: 12px;
  font-size: 15px;
  line-height: 1.6;
  color: #0f1419;
}

.markdown-preview :deep(h1),
.markdown-preview :deep(h2),
.markdown-preview :deep(h3) {
  margin-top: 16px;
  margin-bottom: 8px;
  font-weight: 600;
}

.markdown-preview :deep(h1) { font-size: 1.4em; }
.markdown-preview :deep(h2) { font-size: 1.2em; }
.markdown-preview :deep(h3) { font-size: 1.1em; }

.markdown-preview :deep(p) {
  margin: 0 0 12px 0;
}

.markdown-preview :deep(code) {
  background: rgba(27, 31, 35, 0.08);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 90%;
  font-family: monospace;
}

.markdown-preview :deep(pre) {
  background: #0d1117;
  color: #e6edf3;
  padding: 12px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 12px 0;
}

.markdown-preview :deep(pre code) {
  background: transparent;
  padding: 0;
}

.markdown-preview :deep(blockquote) {
  border-left: 3px solid #1d9bf0;
  padding-left: 12px;
  color: #536471;
  margin: 12px 0;
}

.markdown-preview :deep(ul),
.markdown-preview :deep(ol) {
  padding-left: 20px;
  margin: 8px 0;
}

.markdown-preview :deep(a) {
  color: #1d9bf0;
  text-decoration: none;
}

.markdown-preview :deep(a:hover) {
  text-decoration: underline;
}

/* Markdown Help */
.markdown-help-wrapper {
  margin-top: 8px;
}

.markdown-help-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  border: none;
  background: transparent;
  color: #657786;
  font-size: 12px;
  cursor: pointer;
  padding: 4px 0;
}

.markdown-help-btn:hover {
  color: #1d9bf0;
}

.markdown-help {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
  padding: 12px;
  margin-top: 8px;
  background: #f7f9fa;
  border-radius: 8px;
  font-size: 12px;
}

.help-item {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #536471;
}

.help-item code {
  background: rgba(27, 31, 35, 0.1);
  padding: 2px 4px;
  border-radius: 3px;
  font-family: monospace;
  font-size: 11px;
}
</style>
