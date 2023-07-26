<template>
  <textarea v-model="modelValue" :rows="3" class="z-w-full z-bg-inherit focus:z-outline-none z-resize-none" :autofocus="autofocus" @change="onChange"></textarea>
</template>

<script setup lang="ts" generic="T extends string | number">
import { computed } from "vue";
import type { InputProps } from ".";

const props = defineProps<InputProps<T> & {
  modelValue: T;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: T];
  change: [value: T];
}>();

const modelValue = computed({
  get: () => props.modelValue,
  set: v => emit("update:modelValue", v),
});

function onChange(e: Event) {
  emit("change", (e.currentTarget as HTMLTextAreaElement).value as T);
}
</script>
