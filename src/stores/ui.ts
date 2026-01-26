import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export type Theme = 'kitsune' | 'tanuki';

export const useUIStore = defineStore('ui', () => {
  // 1. Initialize from localStorage if available, otherwise default to 'tanuki'
  const savedTheme = localStorage.getItem('user-theme') as Theme | null;
  const theme = ref<Theme>(savedTheme === 'kitsune' ? 'kitsune' : 'tanuki');

  // 2. Action to toggle between the two specific themes
  function toggleTheme() {
    theme.value = theme.value === 'kitsune' ? 'tanuki' : 'kitsune';
  }

  // 3. Action to set a specific theme
  function setTheme(newTheme: Theme) {
    theme.value = newTheme;
  }

  // 4. Watcher: Whenever 'theme' changes, update the DOM and LocalStorage
  watch(
    theme,
    (newTheme) => {
      // Update LocalStorage
      localStorage.setItem('user-theme', newTheme);

      // Update the HTML attribute so CSS/Tailwind can react
      // This results in <html data-theme="kitsune">
      document.documentElement.setAttribute('data-theme', newTheme);
    },
    { immediate: true }
  ); // Run immediately on load

  return {
    theme,
    toggleTheme,
    setTheme,
  };
});
