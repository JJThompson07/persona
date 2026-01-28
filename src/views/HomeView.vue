<template>
  <router-layout>
    <template #header>
      <component :is="House" class="-mt-1 mr-1 inline-block h-5 w-5" />
      Home
    </template>
    <template #default>
      <section class="flex flex-1 flex-col gap-4">
        <header>
          <div class="flex items-center justify-between">
            <h3 class="mb-2 text-xl font-semibold">Skills</h3>
            <div
              v-show="width <= 900"
              class="relative flex cursor-pointer items-center gap-1 rounded-full px-3 py-1 text-sm font-semibold text-gray-900 transition-all duration-300 ease-in-out select-none hover:text-gray-50"
              :class="
                theme === 'kitsune'
                  ? 'bg-kitsune-100 hover:bg-kitsune-500'
                  : 'bg-tanuki-100 hover:bg-tanuki-500'
              "
              @click="showFilters = !showFilters"
            >
              <div>{{ showFilters ? 'Hide' : 'Show' }} Filters</div>
              <component
                :is="ChevronUp"
                class="right-1 h-5 w-5 transition-all duration-300 ease-in-out"
                :class="showFilters ? 'rotate-0' : 'rotate-180'"
              />
            </div>
          </div>
          <div class="relative flex w-full justify-end gap-2 p-2">
            <transition name="dropdown">
              <div v-show="width > 900 || showFilters" class="w-full">
                <slider-button
                  class="flex-1 text-xs"
                  :options="sections"
                  v-model="selectedSection"
                  :vertical="width <= 900"
                />
              </div>
            </transition>
          </div>
        </header>
        <div class="skills-grid grid items-stretch gap-4">
          <card-shimmer v-for="skill in filteredSkills" :key="skill.id">
            <div
              class="flex flex-1 items-center justify-center p-2 text-center text-sm font-semibold"
            >
              {{ skill.name }}
            </div>
          </card-shimmer>
        </div>
      </section>
    </template>
  </router-layout>
</template>

<script setup lang="ts">
import RouterLayout from '../components/RouterLayout.vue';
import { House, ChevronUp } from 'lucide-vue-next';
import skillsData from '../../data/skills.json';
import { computed, onMounted, ref, watch } from 'vue';
// import CardAnimated from '../components/utility/CardAnimated.vue';
import CardShimmer from '../components/utility/CardShimmer.vue';
import SliderButton, { type SliderButtonOption } from '../components/utility/SliderButton.vue';
import { useWindowSize } from '@vueuse/core';
import { useUIStore, type Theme } from '../stores/ui';

type Skill = {
  id: number;
  section: string;
  name: string;
  experience: string;
  years: string;
};

// ** Refs **
const skills = ref<Skill[]>([]);
const selectedSection = ref<string>('All');
const { width } = useWindowSize();
const showFilters = ref<boolean>(true);
const uiStore = useUIStore();

// ** Computed **
const theme = computed<Theme>(() => uiStore.theme);

const sections = computed<SliderButtonOption[]>(() => {
  const sectionsSet = ['All', ...new Set(skills.value.map((skill) => skill.section))];

  return sectionsSet.map((section) => ({
    label: section,
    value: section
  }));
});

const filteredSkills = computed<Skill[]>(() => {
  if (selectedSection.value === 'All') {
    return skills.value;
  }
  return [...skills.value].filter((skill) => skill.section === selectedSection.value);
});

onMounted(() => {
  skills.value = skillsData.skills as Skill[];
});

watch(
  width,
  (newWidth) => {
    if (newWidth > 900) {
      showFilters.value = true;
    }
  },
  { immediate: true, flush: 'post' }
);
</script>

<style scoped>
.skills-grid {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-auto-rows: 1fr;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition:
    max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.dropdown-enter-from,
.dropdown-leave-to {
  max-height: 0;
  opacity: 0;
}
.dropdown-enter-to,
.dropdown-leave-from {
  max-height: 500px; /* Set to a value larger than your dropdown's max height */
  opacity: 1;
}
</style>
