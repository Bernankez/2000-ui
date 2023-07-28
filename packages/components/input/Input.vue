<template>
  <InputWrapper v-bind="props" :show-suffix="(type !== 'textarea' && showCount) || showPasswordOn">
    <AutoAdjustInput v-if="type === 'input' && autoAdjust" v-bind="props" v-model="mergedState" @change="onChange" />
    <AutoAdjustTextarea v-else-if="type === 'textarea' && autoAdjust" v-model="mergedState" v-bind="props" @change="onChange" />
    <FixedInput v-else v-model="mergedState" :show-password="showPassword" v-bind="props" @change="onChange" />
    <template #suffix>
      <CountSuffix v-if="type !== 'textarea' && showCount" @click="focusInput">
        <slot name="count" :value="valueLength">
          {{ `${valueLength}/${maxlength}` }}
        </slot>
      </CountSuffix>
      <PasswordSuffix v-if="type === 'password' && showPasswordOn" @mousedown="toggle('mousedown')" @click="toggle('click')">
        <slot name="password-icon" :show="showPassword">
          <div v-if="showPassword" class="i-ic:outline-visibility z-inline-block z-items-center" draggable="false"></div>
          <div v-else class="i-ic:outline-visibility-off z-inline-block z-items-center" draggable="false"></div>
        </slot>
      </PasswordSuffix>
    </template>
  </InputWrapper>
</template>

<script setup lang="ts" generic="T extends string | number">
import type { Ref } from "vue";
import { computed, ref } from "vue";
import { useEventListener } from "@vueuse/core";
import type { InputProps } from "./types";
import InputWrapper from "./InputWrapper.vue";
import CountSuffix from "./CountSuffix.vue";
import PasswordSuffix from "./PasswordSuffix.vue";
import AutoAdjustInput from "./AutoAdjustInput.vue";
import AutoAdjustTextarea from "./AutoAdjustTextarea.vue";
import FixedInput from "./FixedInput.vue";
import { useMergedState } from "@/_composables";

const props = withDefaults(defineProps<InputProps<T>>(), {
  type: "input",
});

const emit = defineEmits<{
  input: [value: T];
  change: [value: T];
}>();

const modelValue = computed({
  get: () => props.value,
  set: v => emit("input", v!),
});

const uncontrolledState = ref(props.value || "");
const mergedState = useMergedState(modelValue, uncontrolledState as Ref<T>, v => modelValue.value = v);

const valueLength = computed(() => mergedState.value.toString().length);

function onChange(value: T) {
  emit("change", value);
}

const inputRef = ref<HTMLInputElement>();
function focusInput() {
  inputRef.value?.focus();
}

const showPassword = ref(false);
function toggle(type: "mousedown" | "mouseup" | "click") {
  if (props.showPasswordOn === "mousedown" && type === "mousedown") {
    showPassword.value = true;
    const stop = useEventListener(document, "mouseup", () => {
      showPassword.value = false;
      stop();
    });
  } else if (props.showPasswordOn === "click" && type === "click") {
    showPassword.value = !showPassword.value;
  }
}
</script>
