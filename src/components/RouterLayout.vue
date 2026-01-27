<template>
  <div class="m-4 flex-1 overflow-auto rounded-xl bg-gray-800 shadow-md">
    <header
      class="mb-4 border-b-4 p-2 text-2xl font-bold text-gray-100"
      :class="theme === 'kitsune' ? 'border-kitsune-600' : 'border-tanuki-600'"
    >
      <slot name="header" />
    </header>
    <div class="p-4">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useUIStore, type Theme } from '../stores/ui';

const uiStore = useUIStore();
const theme = computed<Theme>(() => uiStore.theme);
</script>

<style scoped>
/* Hide the scrollbar track */
::-webkit-scrollbar {
  width: 8px; /* or your preferred width */
  background: transparent; /* makes the track invisible */
}

/* Style only the scrollbar thumb (the bar) */
::-webkit-scrollbar-thumb {
  background: #acabab; /* your preferred color */
  border-radius: 4px;
}

/* Optional: Hide scrollbar corner */
::-webkit-scrollbar-corner {
  background: transparent;
}
</style>
