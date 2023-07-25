<template>
  <div class="z-rounded-[var(--rounded-btn)] z-inline-flex z-flex-gap-2 z-b-solid z-b-2 z-b-primary z-bg-base-50 z-text-base-content z-cursor-text z-shadow-primary focus-within:z-shadow-sm z-p-x-2 z-box-border" :class="[disabled ? 'z-cursor-not-allowed' : '']">
    <input ref="inputRef" v-model="mergedState" class="focus:z-outline-none z-bg-inherit" :disabled="disabled" :minlength="minlength" :class="[disabled ? 'z-cursor-not-allowed' : '']" :maxlength="maxlength" :placeholder="placeholder?.toString()" :type="showPassword ? 'text' : type" @change="onChange" />
    <div class="z-flex-gap-2 z-flex">
      <template v-if="showCount">
        <div class="z-flex z-select-none z-text-4 z-text-base-400 z-items-center" @click="focusInput">
          <slot name="count" :value="valueLength">
            {{ `${valueLength}/${maxlength}` }}
          </slot>
        </div>
      </template>
      <template v-if="showPasswordOn">
        <div class="z-flex z-items-center z-cursor-pointer" @mousedown="toggle('mousedown')" @mouseup="toggle('mouseup')" @click="toggle('click')">
          <div v-if="showPassword" class="z-items-center z-inline-block i-ic:outline-visibility"></div>
          <div v-else class="z-inline-block z-items-center i-ic:outline-visibility-off"></div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends string | number">
import type { Ref } from "vue";
import { computed, ref } from "vue";
import { on } from "@2000-ui/utils";
import { useMergedState } from "@/_composables";

const props = withDefaults(defineProps<{
  type?: "input" | "password";
  value?: T;
  placeholder?: string | number;
  disabled?: boolean;
  minlength?: number;
  maxlength?: number;
  showCount?: boolean;
  showPasswordOn?: "mousedown" | "click";
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

const showPassword = ref(false);
function toggle(type: "mousedown" | "mouseup" | "click") {
  if (props.showPasswordOn === "mousedown" && type === "mousedown") {
    showPassword.value = true;
    const stop = on("mouseup", document, () => {
      showPassword.value = false;
      stop();
    });
  } else if (props.showPasswordOn === "click" && type === "click") {
    showPassword.value = !showPassword.value;
  }
}
</script>
