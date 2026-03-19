<template>
  <div class="reading-mode-wrapper">
    <div class="mode-toggle">
      <button
        class="mode-btn"
        :class="{ active: mode === 'quick' }"
        type="button"
        @click="setMode('quick')"
      >
        Quick Read
      </button>
      <button
        class="mode-btn"
        :class="{ active: mode === 'deep' }"
        type="button"
        @click="setMode('deep')"
      >
        Deep Read
      </button>
    </div>

    <!-- Quick Read Mode -->
    <div v-if="mode === 'quick'" class="quick-read">
      <div class="tldr-card">
        <div class="tldr-label">TL;DR</div>
        <p>{{ description }}</p>
      </div>

      <div v-if="takeaways.length > 0" class="key-takeaways">
        <h3>Key Takeaways</h3>
        <ul>
          <li v-for="(item, i) in takeaways" :key="i">{{ item }}</li>
        </ul>
      </div>

      <button class="read-full-btn" type="button" @click="setMode('deep')">
        Read full article &rarr;
      </button>
    </div>

    <!-- Deep Read Mode -->
    <div v-show="mode === 'deep'">
      <slot />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  description: {
    type: String,
    default: '',
  },
  toc: {
    type: Array,
    default: () => [],
  },
})

const STORAGE_KEY = 'readingMode'
const mode = ref('deep')

// Extract section headings as takeaways for quick read
const takeaways = computed(() => {
  if (!props.toc || props.toc.length === 0) return []
  return props.toc
    .filter((link) => link.depth === 2)
    .map((link) => link.text)
    .slice(0, 6)
})

function setMode(newMode) {
  mode.value = newMode
  if (import.meta.client) {
    localStorage.setItem(STORAGE_KEY, newMode)
  }
}

onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'quick' || saved === 'deep') {
    mode.value = saved
  }
})
</script>

<style scoped>
.mode-toggle {
  display: inline-flex;
  padding: 3px;
  margin-bottom: 24px;
  background: #f0f0f3;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 12px;
  box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.07), inset -2px -2px 5px rgba(255, 255, 255, 0.8);
}

.mode-btn {
  padding: 8px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  font-family: inherit;
  background: transparent;
  color: #9ca3af;
  transition: all 0.2s;
}

.mode-btn.active {
  background: #f0f0f3;
  color: #6366f1;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.08), -4px -4px 10px rgba(255, 255, 255, 0.9);
}

.tldr-card {
  padding: 20px 24px;
  margin-bottom: 24px;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.05));
  border: 1px solid rgba(99, 102, 241, 0.15);
  border-radius: 14px;
  border-left: 4px solid #6366f1;
}

.tldr-label {
  font-size: 11px;
  font-weight: 700;
  color: #6366f1;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 8px;
}

.tldr-card p {
  font-size: 15px;
  color: #374151;
  line-height: 1.7;
  margin: 0;
}

.key-takeaways {
  margin-top: 16px;
  margin-bottom: 20px;
}

.key-takeaways h3 {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 10px;
}

.key-takeaways ul {
  list-style: none;
  padding: 0;
}

.key-takeaways li {
  font-size: 14px;
  color: #4b5563;
  padding: 5px 0 5px 20px;
  position: relative;
  line-height: 1.5;
}

.key-takeaways li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 12px;
  width: 8px;
  height: 8px;
  background: #6366f1;
  border-radius: 50%;
}

.read-full-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
  padding: 10px 24px;
  font-size: 13px;
  font-weight: 600;
  color: #6366f1;
  background: #f0f0f3;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 12px;
  cursor: pointer;
  font-family: inherit;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.08), -4px -4px 10px rgba(255, 255, 255, 0.9);
  transition: all 0.15s;
}

.read-full-btn:hover {
  box-shadow: 6px 6px 14px rgba(0, 0, 0, 0.1), -6px -6px 14px rgba(255, 255, 255, 1);
}

.read-full-btn:active {
  box-shadow: inset 3px 3px 6px rgba(0, 0, 0, 0.1), inset -3px -3px 6px rgba(255, 255, 255, 0.9);
}

/* Dark mode */
.dark .mode-toggle {
  background: #1f2937;
  border-color: rgba(255, 255, 255, 0.04);
  box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.3), inset -2px -2px 5px rgba(255, 255, 255, 0.04);
}

.dark .mode-btn {
  color: #6b7280;
}

.dark .mode-btn.active {
  background: #1f2937;
  color: #a5b4fc;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.3), -4px -4px 10px rgba(255, 255, 255, 0.04);
}

.dark .tldr-card {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(139, 92, 246, 0.08));
  border-color: rgba(99, 102, 241, 0.2);
}

.dark .tldr-label {
  color: #a5b4fc;
}

.dark .tldr-card p {
  color: #e5e7eb;
}

.dark .key-takeaways h3 {
  color: #e5e7eb;
}

.dark .key-takeaways li {
  color: #d1d5db;
}

.dark .key-takeaways li::before {
  background: #a5b4fc;
}

.dark .read-full-btn {
  color: #a5b4fc;
  background: #1f2937;
  border-color: rgba(255, 255, 255, 0.04);
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.3), -4px -4px 10px rgba(255, 255, 255, 0.04);
}
</style>
