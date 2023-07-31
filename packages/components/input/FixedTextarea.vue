<template>
  <div ref="textareaWrapperElRef" class="z-relative z-w-full z-overflow-hidden">
    <textarea
      v-model="modelValue" :rows="rows"
      class="z-left-0 z-top-0 z-h-full z-w-full z-resize-none z-whitespace-pre-wrap z-bg-inherit focus:z-outline-none"
      :autofocus="autofocus" @change="onChange"
    ></textarea>
  </div>
</template>

<script setup lang="ts" generic="T extends string | number">
import { computed } from "vue";
import type { InputProps } from ".";

const props = withDefaults(defineProps<InputProps<T> & {
  modelValue: T;
}>(), {
  rows: 3,
});

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
