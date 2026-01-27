<template>
  <router-layout>
    <template #header>
      <component :is="House" class="-mt-1 mr-1 inline-block h-5 w-5" />
      Home
    </template>
    <template #default>
      <section>
        <header>
          <h3 class="mb-4 text-xl font-semibold">Skills</h3>
        </header>
        <div class="skills-grid grid items-stretch gap-4">
          <card-animated v-for="skill in skills" :key="skill.id">
            <div
              class="flex flex-1 items-center justify-center p-2 text-center text-sm font-semibold"
            >
              {{ skill.name }}
            </div>
          </card-animated>
        </div>
      </section>
    </template>
  </router-layout>
</template>

<script setup lang="ts">
import RouterLayout from '../components/RouterLayout.vue';
import { House } from 'lucide-vue-next';
import skillsData from '../../data/skills.json';
import { onMounted, ref } from 'vue';
import CardAnimated from '../components/utility/CardAnimated.vue';

type Skill = {
  id: number;
  section: string;
  name: string;
  experience: string;
  years: string;
};

const skills = ref<Skill[]>([]);

onMounted(() => {
  skills.value = skillsData.skills as Skill[];
});
</script>

<style scoped>
.skills-grid {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-auto-rows: 1fr;
}
</style>
