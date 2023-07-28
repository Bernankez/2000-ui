<template>
  <div :style="style" class="z-relative z-overflow-hidden">
    <input ref="inputRef" v-model="modelValue" :autofocus="autofocus" class="z-absolute z-left-0 z-top-0 z-w-full z-bg-inherit focus:z-outline-none" :disabled="disabled" :minlength="minlength" :class="[disabled ? 'z-cursor-not-allowed' : '']" :maxlength="maxlength" :placeholder="placeholder?.toString()" :type="showPassword ? 'text' : type" @change="onChange" />
    <div class="z-pointer-events-none z-invisible z-whitespace-pre z-vertical-base">
      {{ modelValue || " " }}
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends string | number">
import { computed } from "vue";
import type { InputProps } from "./types";

const props = defineProps<InputProps<T> & {
  modelValue: T;
  showPassword?: boolean;
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
  emit("change", (e.currentTarget as HTMLInputElement).value as T);
}
</script>
