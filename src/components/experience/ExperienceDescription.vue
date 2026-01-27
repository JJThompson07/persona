<template>
  <div class="description mb-2 text-xs" :class="{ tagged: tag }">
    <span
      v-if="tag"
      :class="theme === 'kitsune' ? 'text-kitsune-300' : 'text-tanuki-300'"
      class="text-sm font-semibold"
      >{{ tag }}:
    </span>
    <slot />
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
.description {
  &.tagged {
    display: grid;
    grid-template-columns: 2fr 5fr;
  }
}
</style>
