<template>
  <div class="flex items-center justify-between bg-gray-900 shadow-md">
    <div>
      <img
        v-if="theme === 'tanuki'"
        src="../assets/tanuki.png"
        alt="Tanuki Logo"
        class="m-2 h-12 w-12"
        @click="uiStore.toggleTheme()"
      />
      <img
        v-else
        src="../assets/kitsune.png"
        alt="kitsune Logo"
        class="m-2 h-12 w-12"
        @click="uiStore.toggleTheme()"
      />
    </div>
    <nav class="flex items-center justify-center gap-2 px-4 py-2">
      <RouterLink
        v-for="route in routes"
        :key="route.name"
        :to="route.path"
        class="text-gray-50 capitalize transition-colors duration-300 ease-in-out"
        :class="[theme === 'kitsune' ? 'hover:text-kitsune-400' : 'hover:text-tanuki-400']"
        :active-class="theme === 'kitsune' ? 'text-kitsune-600' : 'text-tanuki-600'"
      >
        <component
          :is="route.meta?.icon"
          v-if="route.meta?.icon"
          class="-mt-1 mr-1 inline-block h-5 w-5"
        />
        {{ route.name }}
      </RouterLink>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, useRouter, type RouteRecord } from 'vue-router';
import { useUIStore } from '../stores/ui';

const uiStore = useUIStore();
const theme = computed(() => uiStore.theme);

const router = useRouter();

const routes = computed<RouteRecord[]>(() => router.getRoutes());
</script>

<style scoped></style>
