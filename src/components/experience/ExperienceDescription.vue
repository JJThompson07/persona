<template>
  <div
    class="description mb-2 flex flex-col items-start gap-2 text-xs leading-relaxed md:grid"
    :class="{ tagged: tag }"
  >
    <span
      v-if="tag"
      :class="theme === 'kitsune' ? 'bg-kitsune-600' : 'bg-tanuki-600'"
      class="mr-2 w-max rounded-full px-2 py-1 text-center text-xs font-semibold whitespace-nowrap text-white"
      >{{ tag }}
    </span>
    <div class="flex-1">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useUIStore, type Theme } from '../../stores/ui';
defineProps({
  tag: {
    type: String,
    required: false
  }
});

const uiStore = useUIStore();
const theme = computed<Theme>(() => uiStore.theme);
</script>

<style scoped>
.tagged {
  grid-template-columns: 200px 3fr;
}
</style>
