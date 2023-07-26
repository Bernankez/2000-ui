<template>
  <div :style="style" class="z-relative z-overflow-hidden">
    <input ref="inputRef" v-model="modelValue" :autofocus="autofocus" class="z-w-full focus:z-outline-none z-bg-inherit z-absolute z-left-0 z-top-0" :disabled="disabled" :minlength="minlength" :class="[disabled ? 'z-cursor-not-allowed' : '']" :maxlength="maxlength" :placeholder="placeholder?.toString()" :type="showPassword ? 'text' : type" @change="onChange" />
    <div class="z-invisible z-pointer-events-none z-vertical-base z-whitespace-pre">
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
