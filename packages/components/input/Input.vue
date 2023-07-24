<template>
  <input v-model="mergedState" :placeholder="placeholder?.toString()" class="z-b-solid focus:z-outline-none z-b-2 z-b-primary z-bg-base-50 focus:z-shadow-primary focus:z-shadow-sm z-text-base-content" :type="type" @input="onInput" @change="onChange" />
</template>

<script setup lang="ts" generic="T extends string | number">
import type { Ref } from "vue";
import { computed, ref } from "vue";
import { useMergedState } from "@/_composables";

const props = withDefaults(defineProps<{
  type?: "input";
  value?: T;
  placeholder?: string | number;
}>(), {
  type: "input",
});

const emit = defineEmits<{
  input: [value: T ];
}>();

const modelValue = computed({
  get: () => props.value,
  set: v => emit("input", v!),
});

const uncontrolledState = ref(props.value);
const mergedState = useMergedState(modelValue, uncontrolledState as Ref<T>, v => modelValue.value = v);

function onInput(_e: Event) {}

function onChange(_e: Event) {}
</script>
