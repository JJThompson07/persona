<template>
  <div class="mb-2">
    <span v-if="tag" class="font-semibold">{{ tag }}: </span>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps({
  tag: {
    type: String,
    required: false
  }
});
</script>

<style scoped></style>
