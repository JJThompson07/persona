<template>
  <router-layout>
    <template #header>Experience</template>
    <template #default>
      <div class="flex flex-col">
        <div
          v-for="(experience, index) in experiences"
          :key="experience.company"
          class="mb-6 flex w-1/2 flex-col gap-4"
          :class="index % 2 === 0 ? 'self-start' : 'self-end'"
        >
          <header>{{ experience.company }}</header>
          <experience-card
            v-for="role in experience.roles"
            :key="role.title"
            :title="role.title"
            :start="role.start"
            :end="role.end"
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
    </template>
  </router-layout>
</template>

<script setup lang="ts">
import RouterLayout from '../components/RouterLayout.vue';
import experienceData from '../../data/experience.json';
import { onMounted, ref } from 'vue';
import ExperienceCard from '../components/experience/ExperienceCard.vue';
import ExperienceDescription from '../components/experience/ExperienceDescription.vue';

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

onMounted(() => {
  experiences.value = experienceData.experiences as Experience[];
});
</script>

<style scoped></style>
