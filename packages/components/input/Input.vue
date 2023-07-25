<template>
  <div class="z-b-solid z-b-2 z-b-primary z-bg-base-50 z-text-base-content z-cursor-text z-shadow-primary focus-within:z-shadow-sm z-inline-block" :class="[disabled ? 'z-cursor-not-allowed' : '']">
    <input ref="inputRef" v-model="mergedState" class="focus:z-outline-none z-bg-inherit" :disabled="disabled" :minlength="minlength" :class="[disabled ? 'z-cursor-not-allowed' : '']" :maxlength="maxlength" :placeholder="placeholder?.toString()" :type="type" @change="onChange" />
    <template v-if="showCount">
      <span class="z-select-none z-text-4 z-text-base-400" @click="focusInput">
        <slot name="count" :value="valueLength">
          {{ `${valueLength}/${maxlength}` }}
        </slot>
      </span>
    </template>
  </div>
</template>

<script setup lang="ts" generic="T extends string | number">
import type { Ref } from "vue";
import { computed, ref } from "vue";
import { useMergedState } from "@/_composables";

const props = withDefaults(defineProps<{
  type?: "input";
  value?: T;
  placeholder?: string | number;
  disabled?: boolean;
  minlength?: number;
  maxlength?: number;
  showCount?: boolean;
}>(), {
  type: "input",
});

const emit = defineEmits<{
  input: [value: T ];
  change: [value:T];
}>();

const modelValue = computed({
  get: () => props.value,
  set: v => emit("input", v!),
});

const uncontrolledState = ref(props.value || "");
const mergedState = useMergedState(modelValue, uncontrolledState as Ref<T>, v => modelValue.value = v);

const valueLength = computed(() => mergedState.value.toString().length);

function onChange(e: Event) {
  emit("change", (e.target as HTMLInputElement).value as T);
}

const inputRef = ref<HTMLInputElement>();
function focusInput() {
  inputRef.value?.focus();
}
</script>
