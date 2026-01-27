<template>
  <router-layout>
    <template #header>
      <component :is="Waypoints" class="-mt-1 mr-1 inline-block h-5 w-5" />
      Experience
    </template>
    <template #default>
      <div class="flex flex-1 flex-col gap-4">
        <div
          v-for="experience in experiences"
          :key="experience.company"
          class="flex shrink-0 flex-col gap-4"
        >
          <div class="flex flex-col gap-4">
            <div
              v-for="role in experience.roles"
              :key="role.title"
              class="experience-grid items-center gap-4 md:grid"
            >
              <div class="p-4">
                <p
                  class="text-sm"
                  :class="
                    hoveredStart === role.start
                      ? theme === 'kitsune'
                        ? 'text-kitsune-500'
                        : 'text-tanuki-500'
                      : 'text-gray-500'
                  "
                >
                  {{ role.start }}
                </p>
              </div>
              <experience-card
                :company="experience.company"
                :title="role.title"
                :start="role.start"
                :end="role.end"
                class="flex-1"
                @hovered="$event ? (hoveredStart = role.start) : (hoveredStart = null)"
              >
                <experience-description
                  v-for="desc in role.descriptions"
                  :key="desc.topic"
                  :tag="desc.topic"
                >
                  {{ desc.description }}
                </experience-description>
              </experience-card>
            </div>
          </div>
        </div>
      </div>
    </template>
  </router-layout>
</template>

<script setup lang="ts">
import RouterLayout from '../components/RouterLayout.vue';
import experienceData from '../../data/experience.json';
import { computed, onMounted, ref } from 'vue';
import ExperienceCard from '../components/experience/ExperienceCard.vue';
import ExperienceDescription from '../components/experience/ExperienceDescription.vue';
import { Waypoints } from 'lucide-vue-next';
import { useUIStore, type Theme } from '../stores/ui';

type Description = {
  topic: string;
  description: string;
};

type Role = {
  title: string;
  start: string;
  end: string;
  descriptions: Description[];
};

type Experience = {
  company: string;
  roles: Role[];
};

const experiences = ref<Experience[]>([]);
const hoveredStart = ref<string | null>(null);
const uiStore = useUIStore();

// ** Computed theme based on UI store **
const theme = computed<Theme>(() => uiStore.theme);

onMounted(() => {
  experiences.value = experienceData.experiences as Experience[];
});
</script>

<style scoped>
.experience-grid {
  grid-template-columns: 150px 1fr;
}
</style>
