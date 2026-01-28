<template>
  <div
    ref="cardAnimated"
    class="relative overflow-hidden rounded-lg bg-gray-600 p-1 select-none"
    :class="{ hovered: isHovered }"
  >
    <section class="relative z-10 flex h-full flex-col rounded-md">
      <slot />
    </section>
    <span
      v-for="ripple in ripples"
      :key="ripple.id"
      :style="{ left: `${ripple.x}px`, top: `${ripple.y}px` }"
      class="ripple absolute h-1 w-1 rounded-full transition-all duration-700 ease-in-out"
      :class="theme === 'kitsune' ? 'bg-kitsune-500' : 'bg-tanuki-500'"
    ></span>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useUIStore, type Theme } from '../../stores/ui';
import { useElementHover, useMouseInElement } from '@vueuse/core';
import { ref } from 'vue';

const cardAnimated = ref<HTMLElement | null>(null);
const isHovered = useElementHover(cardAnimated);
const { elementX: x, elementY: y, isOutside } = useMouseInElement(cardAnimated);
const ripples = ref<Array<{ id: number; x: number; y: number }>>([]);

const uiStore = useUIStore();

const theme = computed<Theme>(() => uiStore.theme);

const handleMove = (x: number, y: number) => {
  const newRipple = {
    id: Date.now(),
    x: x - 10, // Center the ripple
    y: y - 10 // Center the ripple
  };
  ripples.value.push(newRipple);

  // Remove the ripple after animation
  setTimeout(() => {
    ripples.value = ripples.value.filter((ripple) => ripple.id !== newRipple.id);
  }, 700); // Match the duration of the CSS transition
};

watch(
  [x, y],
  () => {
    if (!isOutside.value) {
      handleMove(x.value, y.value);
    }
  },
  { deep: true }
);
</script>

<style scoped>
.ripple {
  animation: rippleEffect 700ms ease-out forwards;
}

@keyframes rippleEffect {
  0% {
    opacity: 0.4;
    transform: scale(0);
  }
  75% {
    opacity: 0.2;
    transform: scale(50);
  }
  100% {
    opacity: 0;
    transform: scale(500);
  }
}
</style>
