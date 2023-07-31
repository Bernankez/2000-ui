<template>
  <InputWrapper v-bind="props" :show-suffix="showCount || showPasswordOn">
    <AutoAdjustInput v-if="type === 'input' && autoAdjust" ref="autoAdjustInputElRef" v-bind="props" v-model="mergedState" @change="onChange" />
    <AutoAdjustTextarea v-else-if="type === 'textarea' && autoAdjust" v-model="mergedState" v-bind="props" @change="onChange" />
    <FixedTextarea v-else-if="type === 'textarea'" v-model="mergedState" v-bind="props" @change="onChange" />
    <FixedInput v-else ref="fixedInputElRef" v-model="mergedState" :show-password="showPassword" v-bind="props" @change="onChange" />
    <template #suffix>
      <CountSuffix v-if="showCount" :class="[type === 'textarea' ? 'z-absolute z-bottom-1 z-right-2 z-pointer-events-none' : '']" @click="focusInput">
        <slot name="count" :value="valueLength">
          {{ `${valueLength}/${maxlength ?? "99+"}` }}
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
import type { ComponentInstance } from "@2000-ui/utils";
import type { InputProps } from "./types";
import InputWrapper from "./InputWrapper.vue";
import CountSuffix from "./CountSuffix.vue";
import PasswordSuffix from "./PasswordSuffix.vue";
import AutoAdjustInput from "./AutoAdjustInput.vue";
import AutoAdjustTextarea from "./AutoAdjustTextarea.vue";
import FixedInput from "./FixedInput.vue";
import FixedTextarea from "./FixedTextarea.vue";
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

const autoAdjustInputElRef = ref<ComponentInstance<typeof AutoAdjustInput> >();
const fixedInputElRef = ref<ComponentInstance<typeof FixedInput>>();
function focusInput() {
  if (props.type !== "textarea") {
    if (props.type !== "password" && props.autoAdjust) {
      autoAdjustInputElRef.value?.focus();
    } else {
      fixedInputElRef.value?.focus();
    }
  }
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
