<template>
  <div
    ref="sliderButton"
    class="slider-button relative cursor-pointer overflow-hidden select-none"
    :class="[
      theme === 'kitsune' ? 'bg-kitsune-50' : 'bg-tanuki-50',
      vertical ? 'rounded-md' : 'rounded-full'
    ]"
    :style="wrapperStyles"
  >
    <span
      class="slider-button-highlight absolute"
      :class="[
        theme === 'kitsune' ? 'bg-kitsune-600' : 'bg-tanuki-600',
        vertical ? 'rounded-md' : 'rounded-full',
        allowTransition ? 'transition-all duration-300 ease-in-out' : ''
      ]"
      :style="highlightStyles"
    />
    <div
      v-for="option in options"
      :key="option.value"
      class="slider-button-button relative bg-transparent px-3 py-2 text-center font-medium"
      :class="[
        allowTransition ? 'transition-all duration-300 ease-in-out' : '',
        selectedOption === option.value ? 'text-gray-100' : 'text-gray-900'
      ]"
      @click="onClick(option.value)"
    >
      {{ option.label }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useElementSize } from '@vueuse/core';
import type { CSSProperties, PropType } from 'vue';
import { computed, ref, useTemplateRef, watch } from 'vue';

export type SliderButtonOption = {
  label: string;
  value: number | string;
};

const props = defineProps({
  /** The selected value which may be v-modelled. */
  modelValue: {
    type: [String, Number],
    required: true
  },
  /** The permitted options to select from. */
  options: {
    type: Array as PropType<SliderButtonOption[]>,
    default: () => []
  },
  /** Should the button be stacked vertically. */
  vertical: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: SliderButtonOption['value']): void;
}>();

// ** Data **
// Prevent a bug with the transition being played when setting the initial state as otherwise the
// UI looks unnecessarily busy.
const allowTransition = ref<boolean>(false);
const selectedOption = ref<SliderButtonOption['value']>(props.modelValue);
const sliderButton = useTemplateRef('sliderButton');
const { width: sliderButtonWidth, height: sliderButtonHeight } = useElementSize(sliderButton);
import { useUIStore, type Theme } from '../../stores/ui';
const uiStore = useUIStore();

// ** Computed **
const wrapperStyles = computed<CSSProperties>(() => {
  return {
    display: 'grid',
    [`grid-template-${props.vertical ? 'rows' : 'columns'}`]: props.options
      .map(() => '1fr')
      .join(' ')
  };
});

const highlightStyles = computed<CSSProperties>(() => {
  const sliderButtonSize = props.vertical ? sliderButtonHeight.value : sliderButtonWidth.value;
  const buttonSize = sliderButtonSize / props.options.length;

  const blockOffset = `${buttonSize * props.options.findIndex((o) => o.value === selectedOption.value)}px`;
  const blockSize = '100%';
  const inlineOffset = 0;
  const inlineSize = buttonSize ? `${buttonSize}px` : `calc(100% / ${props.options.length})`;

  if (props.vertical) {
    return { width: blockSize, height: inlineSize, top: blockOffset, left: inlineOffset };
  } else {
    return { width: inlineSize, height: blockSize, top: inlineOffset, left: blockOffset };
  }
});

const theme = computed<Theme>(() => uiStore.theme);

// ** Methods **
const onClick = (value: SliderButtonOption['value']): void => {
  selectedOption.value = value;
  allowTransition.value = true;
  emit('update:modelValue', value);
};

// ** Watchers **
watch(
  () => props.modelValue,
  () => (selectedOption.value = props.modelValue),
  { flush: 'post', immediate: true }
);

// Whenever the modelValue changes _after_ the initial set via props, allow the transition to be
// played.
watch(
  () => props.modelValue,
  () => (allowTransition.value = true),
  { immediate: false }
);
</script>
