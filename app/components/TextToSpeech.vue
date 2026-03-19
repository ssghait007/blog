<template>
  <div v-if="audioSrc" class="tts-bar">
    <audio ref="audioEl" :src="audioSrc" preload="metadata" @loadedmetadata="onMetadata" @timeupdate="onTimeUpdate" @ended="onEnded" @error="onError" />

    <button
      class="tts-play-btn"
      type="button"
      :aria-label="playing ? 'Pause article audio' : 'Play article audio'"
      @click="togglePlayback"
      @keyup.enter="togglePlayback"
    >
      <span v-if="playing">&#10074;&#10074;</span>
      <span v-else>&#9654;</span>
    </button>

    <button
      v-if="started"
      class="tts-stop-btn"
      type="button"
      aria-label="Stop audio"
      @click="stopPlayback"
      @keyup.enter="stopPlayback"
    >
      &#9632;
    </button>

    <span class="tts-label">{{ statusText }}</span>

    <div class="tts-progress-track" @click="seek">
      <div class="tts-progress-fill" :style="{ width: progressPercent + '%' }" />
    </div>

    <span class="tts-time">{{ formattedElapsed }} / {{ formattedTotal }}</span>

    <button
      class="tts-speed-btn"
      type="button"
      aria-label="Change playback speed"
      @click="cycleSpeed"
      @keyup.enter="cycleSpeed"
    >
      {{ currentSpeed }}x
    </button>
  </div>
</template>

<script setup>
defineProps({
  audioSrc: {
    type: String,
    default: '',
  },
})

const audioEl = ref(null)
const playing = ref(false)
const started = ref(false)
const progressPercent = ref(0)
const elapsedSeconds = ref(0)
const totalSeconds = ref(0)

const speeds = [1, 1.5, 2, 0.5]
const speedIndex = ref(0)
const currentSpeed = computed(() => speeds[speedIndex.value])

const statusText = computed(() => {
  if (!started.value) return 'Listen to article'
  if (playing.value) return 'Playing...'
  return 'Paused'
})

const formattedElapsed = computed(() => formatTime(elapsedSeconds.value))
const formattedTotal = computed(() => formatTime(totalSeconds.value))

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

function onMetadata() {
  if (audioEl.value) {
    totalSeconds.value = audioEl.value.duration
  }
}

function onTimeUpdate() {
  if (audioEl.value) {
    elapsedSeconds.value = audioEl.value.currentTime
    progressPercent.value = totalSeconds.value > 0
      ? (audioEl.value.currentTime / totalSeconds.value) * 100
      : 0
  }
}

function onEnded() {
  playing.value = false
  started.value = false
  progressPercent.value = 100
  elapsedSeconds.value = totalSeconds.value
}

function onError() {
  playing.value = false
  started.value = false
}

function togglePlayback() {
  if (!audioEl.value) return

  if (playing.value) {
    audioEl.value.pause()
    playing.value = false
  } else {
    audioEl.value.play()
    playing.value = true
    started.value = true
  }
}

function stopPlayback() {
  if (!audioEl.value) return
  audioEl.value.pause()
  audioEl.value.currentTime = 0
  playing.value = false
  started.value = false
  progressPercent.value = 0
  elapsedSeconds.value = 0
}

function cycleSpeed() {
  speedIndex.value = (speedIndex.value + 1) % speeds.length
  if (audioEl.value) {
    audioEl.value.playbackRate = currentSpeed.value
  }
}

function seek(event) {
  if (!audioEl.value || totalSeconds.value === 0) return
  const rect = event.currentTarget.getBoundingClientRect()
  const ratio = (event.clientX - rect.left) / rect.width
  audioEl.value.currentTime = ratio * totalSeconds.value
}

onBeforeUnmount(() => {
  if (audioEl.value) {
    audioEl.value.pause()
  }
})
</script>

<style scoped>
.tts-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  background: #f0f0f3;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 14px;
  box-shadow: 6px 6px 14px rgba(0, 0, 0, 0.1), -6px -6px 14px rgba(255, 255, 255, 0.9);
  margin-bottom: 32px;
}

.tts-play-btn,
.tts-stop-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background: #f0f0f3;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1), -4px -4px 10px rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6366f1;
  font-size: 16px;
  transition: all 0.15s;
  flex-shrink: 0;
}

.tts-stop-btn {
  width: 32px;
  height: 32px;
  font-size: 14px;
}

.tts-play-btn:active,
.tts-stop-btn:active {
  box-shadow: inset 3px 3px 6px rgba(0, 0, 0, 0.1), inset -3px -3px 6px rgba(255, 255, 255, 0.9);
}

.tts-label {
  font-size: 13px;
  font-weight: 600;
  color: #6366f1;
  white-space: nowrap;
}

.tts-progress-track {
  flex: 1;
  height: 4px;
  background: #e0e0e5;
  border-radius: 99px;
  overflow: hidden;
  box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.08);
  cursor: pointer;
}

.tts-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
  border-radius: 99px;
  transition: width 0.3s;
}

.tts-time {
  font-size: 12px;
  color: #9ca3af;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}

.tts-speed-btn {
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 600;
  color: #6366f1;
  background: #f0f0f3;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.07), -2px -2px 6px rgba(255, 255, 255, 0.85);
  transition: all 0.15s;
  flex-shrink: 0;
}

.tts-speed-btn:active {
  box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.08), inset -2px -2px 4px rgba(255, 255, 255, 0.8);
}

/* Dark mode */
.dark .tts-bar {
  background: #1f2937;
  border-color: rgba(255, 255, 255, 0.04);
  box-shadow: 6px 6px 14px rgba(0, 0, 0, 0.35), -6px -6px 14px rgba(255, 255, 255, 0.04);
}

.dark .tts-play-btn,
.dark .tts-stop-btn {
  background: #1f2937;
  color: #a5b4fc;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.3), -4px -4px 10px rgba(255, 255, 255, 0.04);
}

.dark .tts-play-btn:active,
.dark .tts-stop-btn:active {
  box-shadow: inset 3px 3px 6px rgba(0, 0, 0, 0.35), inset -3px -3px 6px rgba(255, 255, 255, 0.04);
}

.dark .tts-label {
  color: #a5b4fc;
}

.dark .tts-progress-track {
  background: #374151;
  box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.2);
}

.dark .tts-time {
  color: #6b7280;
}

.dark .tts-speed-btn {
  color: #a5b4fc;
  background: #1f2937;
  border-color: rgba(255, 255, 255, 0.04);
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3), -2px -2px 6px rgba(255, 255, 255, 0.03);
}

.dark .tts-speed-btn:active {
  box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.3), inset -2px -2px 4px rgba(255, 255, 255, 0.04);
}

/* Mobile responsive */
@media (max-width: 640px) {
  .tts-bar {
    flex-wrap: wrap;
    gap: 8px;
    padding: 12px 14px;
  }
  .tts-label {
    font-size: 12px;
  }
  .tts-progress-track {
    order: 5;
    width: 100%;
    flex: none;
  }
  .tts-time {
    order: 6;
    margin-left: auto;
  }
}
</style>
