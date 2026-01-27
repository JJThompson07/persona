<template>
  <card-animated ref="experienceCard" class="relative w-full">
    <header class="flex flex-col border-b border-gray-900 p-2">
      <h2 class="mb-0 text-xl font-semibold">{{ title }}</h2>
      <div class="flex items-end justify-between text-gray-500">
        <h2 class="mb-0 text-sm font-semibold">{{ company }}</h2>
        <p class="text-sm dark:text-gray-400">{{ start }} - {{ end }}</p>
      </div>
    </header>
    <div v-show="$slots.default" class="p-2 text-xs">
      <slot />
    </div>
  </card-animated>
</template>

<script setup lang="ts">
import { watchEffect } from 'vue';
import { useElementHover } from '@vueuse/core';
import { ref } from 'vue';
import CardAnimated from '../utility/CardAnimated.vue';

defineProps({
  company: {
    type: String,
    required: true
  },
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

const emit = defineEmits(['hovered']);

// ** Refs **
const experienceCard = ref<HTMLElement | null>(null);
const isHovered = useElementHover(experienceCard);

watchEffect(() => {
  emit('hovered', isHovered.value);
});
</script>

<style scoped></style>
