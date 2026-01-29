<template>
  <div
    ref="routerView"
    class="m-4 flex flex-1 flex-col rounded-xl bg-gray-800 shadow-md"
    :class="isHovered ? 'overflow-auto' : 'overflow-hidden'"
  >
    <header
      class="mb-4 border-b-4 p-2 text-2xl font-bold text-gray-50"
      :class="theme === 'kitsune' ? 'border-kitsune-600' : 'border-tanuki-600'"
    >
      <slot name="header" />
    </header>
    <div class="flex flex-1 flex-col p-4">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useUIStore, type Theme } from '../stores/ui';
import { useElementHover } from '@vueuse/core';

const uiStore = useUIStore();
const theme = computed<Theme>(() => uiStore.theme);

const routerView = ref<HTMLElement | null>(null);
const isHovered = useElementHover(routerView);
</script>

<style scoped>
/* Hide the scrollbar track */
::-webkit-scrollbar {
  width: 4px; /* or your preferred width */
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
