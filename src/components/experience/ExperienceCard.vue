<template>
  <section class="rounded-lg bg-gray-900">
    <header class="flex items-end justify-between border-b border-gray-700 p-2">
      <h3 class="mb-0 text-xl font-semibold">{{ title }}</h3>
      <p class="text-sm text-gray-500 dark:text-gray-400">{{ start }} - {{ end }}</p>
    </header>
    <div v-if="$slots.default" class="p-2">
      <slot />
    </div>
    <footer v-if="$slots.footer"></footer>
  </section>
</template>

<script setup lang="ts">
// import { computed } from 'vue';
// import { useUIStore, type Theme } from '../../stores/ui';

defineProps({
  title: {
    type: String,
    required: true
  },
  start: {
    type: String,
    required: true
  },
  end: {
    type: String,
    default: 'Present'
  }
});

// const uiStore = useUIStore();

// const theme = computed<Theme>(() => uiStore.theme);
</script>

<style scoped></style>
