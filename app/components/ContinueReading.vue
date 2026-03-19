<template>
  <section v-if="history.length > 0" class="continue-strip">
    <div class="strip-header">
      <h2 class="strip-title">pick up where you left off</h2>
      <button class="strip-dismiss" type="button" @click="handleClear">Clear history</button>
    </div>
    <div class="strip-scroll">
      <NuxtLink
        v-for="item in history"
        :key="item.path"
        :to="item.path"
        class="strip-card"
      >
        <img
          v-if="item.image"
          class="strip-card-img"
          :src="item.image"
          :alt="`Thumbnail for ${item.title}`"
        />
        <div v-else class="strip-card-img strip-card-img-placeholder" />
        <div class="strip-card-body">
          <span class="strip-card-cat">{{ item.category }}</span>
          <span class="strip-card-title">{{ item.title }}</span>
          <span class="strip-card-meta">{{ item.readingTime }} &middot; {{ formatVisitedAt(item.visitedAt) }}</span>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup>
const { getHistory, clearHistory } = useReadingHistory()
const history = ref([])

onMounted(() => {
  history.value = getHistory()
})

function handleClear() {
  clearHistory()
  history.value = []
}

function formatVisitedAt(timestamp) {
  const diff = Date.now() - timestamp
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days === 1) return 'Yesterday'
  return `${days}d ago`
}
</script>

<style scoped>
.continue-strip {
  max-width: 1100px;
  margin: -40px auto 40px;
  padding: 0 20px;
}

.strip-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.strip-title {
  font-size: 16px;
  font-weight: 600;
  color: #374151;
}

.dark .strip-title {
  color: #e5e7eb;
}

.strip-dismiss {
  margin-left: auto;
  font-size: 12px;
  color: #9ca3af;
  cursor: pointer;
  background: none;
  border: none;
  font-family: inherit;
}
.strip-dismiss:hover {
  color: #6b7280;
}

.strip-scroll {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.strip-card {
  display: flex;
  gap: 14px;
  padding: 14px;
  background: #f0f0f3;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 14px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.08), -4px -4px 10px rgba(255, 255, 255, 0.9);
  cursor: pointer;
  transition: all 0.15s;
  text-decoration: none;
  color: inherit;
}
.strip-card:hover {
  box-shadow: 6px 6px 14px rgba(0, 0, 0, 0.1), -6px -6px 14px rgba(255, 255, 255, 1);
  transform: translateY(-2px);
}

.strip-card-img {
  width: 72px;
  height: 72px;
  border-radius: 10px;
  flex-shrink: 0;
  object-fit: cover;
}
.strip-card-img-placeholder {
  background: linear-gradient(135deg, #667eea, #764ba2);
}

.strip-card-body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.strip-card-cat {
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #6366f1;
  margin-bottom: 4px;
}

.strip-card-title {
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.strip-card-meta {
  font-size: 11px;
  color: #9ca3af;
  margin-top: 4px;
}

/* Dark mode */
.dark .strip-card {
  background: #1f2937;
  border-color: rgba(255, 255, 255, 0.04);
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.3), -4px -4px 10px rgba(255, 255, 255, 0.04);
}
.dark .strip-card:hover {
  box-shadow: 6px 6px 14px rgba(0, 0, 0, 0.35), -6px -6px 14px rgba(255, 255, 255, 0.06);
}

.dark .strip-card-cat {
  color: #a5b4fc;
}
.dark .strip-card-title {
  color: #f3f4f6;
}
.dark .strip-card-meta {
  color: #6b7280;
}

/* Mobile */
@media (max-width: 640px) {
  .continue-strip {
    margin-top: -20px;
  }
  .strip-scroll {
    grid-template-columns: 1fr;
  }
  .strip-header {
    flex-wrap: wrap;
  }
  .strip-title {
    font-size: 14px;
  }
}
</style>
