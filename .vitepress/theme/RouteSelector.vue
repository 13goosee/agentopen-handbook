<script setup>
import { ref, nextTick, onMounted } from 'vue'
import { onContentUpdated } from 'vitepress'

const selectedRoute = ref('all')

function setRoute(r) {
  selectedRoute.value = r
  localStorage.setItem('handbook-route', r)
  applyFilter(r)
}

function applyFilter(r) {
  document.documentElement.dataset.handbookRoute = r
  markElements()
}

function markElements() {
  const container =
    document.querySelector('.vp-doc > div') ||
    document.querySelector('.vp-doc')
  if (!container) return

  // Clear previous marks
  container.querySelectorAll('[data-route]').forEach((el) => {
    delete el.dataset.route
  })

  let current = null

  for (const el of container.children) {
    // Only match <p><strong>🅰/🅱/出問題了</strong></p>
    if (el.tagName === 'P') {
      const strong = el.querySelector(':scope > strong')
      if (strong) {
        const t = strong.textContent || ''
        if (t.includes('🅰')) {
          current = 'a'
          el.dataset.route = 'a'
          continue
        }
        if (t.includes('🅱')) {
          current = 'b'
          el.dataset.route = 'b'
          continue
        }
        if (t.includes('出問題了')) {
          current = null
          continue
        }
      }
    }

    // Section breaks reset route context
    if (
      el.tagName === 'HR' ||
      el.tagName === 'H1' ||
      el.tagName === 'H2' ||
      el.tagName === 'H3'
    ) {
      current = null
      continue
    }

    if (current) {
      el.dataset.route = current
    }
  }
}

onMounted(() => {
  const saved = localStorage.getItem('handbook-route')
  if (saved) selectedRoute.value = saved
  nextTick(() => applyFilter(selectedRoute.value))
})

// Re-apply after VitePress renders new page content
onContentUpdated(() => {
  applyFilter(selectedRoute.value)
})
</script>

<template>
  <div class="route-selector">
    <span class="route-label">路線：</span>
    <div class="route-buttons">
      <button
        :class="['route-btn', { active: selectedRoute === 'all' }]"
        @click="setRoute('all')"
      >
        全部
      </button>
      <button
        :class="['route-btn', { active: selectedRoute === 'a' }]"
        @click="setRoute('a')"
      >
        🅰 用 Claude Code
      </button>
      <button
        :class="['route-btn', { active: selectedRoute === 'b' }]"
        @click="setRoute('b')"
      >
        🅱 建自己的 Agent
      </button>
    </div>
  </div>
</template>

<style scoped>
.route-selector {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  margin-bottom: 1.5rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  flex-wrap: wrap;
}

.route-label {
  font-size: 0.85em;
  font-weight: 600;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

.route-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.route-btn {
  padding: 0.35rem 0.85rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-size: 0.85em;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.route-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.route-btn.active {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: #fff;
  font-weight: 500;
}
</style>
