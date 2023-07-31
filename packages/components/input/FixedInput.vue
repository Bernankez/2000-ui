<template>
  <input ref="inputElRef" v-model="modelValue" :autofocus="autofocus" class="z-w-full z-bg-inherit focus:z-outline-none" :disabled="disabled" :minlength="minlength" :class="[disabled ? 'z-cursor-not-allowed' : '']" :maxlength="maxlength" :placeholder="placeholder?.toString()" :type="showPassword ? 'text' : type" @change="onChange" />
</template>

<script setup lang="ts" generic="T extends string | number">
import { computed, ref } from "vue";
import type { InputProps } from ".";

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

const inputElRef = ref<HTMLInputElement>();
function focus() {
  inputElRef.value?.focus();
}

defineExpose({
  focus,
});

function onChange(e: Event) {
  emit("change", (e.currentTarget as HTMLInputElement).value as T);
}
</script>
