<template>
  <div ref="textareaWrapperElRef" class="z-relative z-w-full z-overflow-hidden">
    <textarea ref="textareaElRef" v-model="modelValue" :rows="minRows" class="z-absolute z-left-0 z-top-0 z-h-full z-w-full z-resize-none z-whitespace-pre-wrap z-bg-inherit focus:z-outline-none" :autofocus="autofocus" @change="onChange"></textarea>
    <div class="z-textarea-mirror z-pointer-events-none z-invisible z-h-full z-w-full z-whitespace-pre-wrap z-break-words">
      {{ `${modelValue ?? ""}\r\n` }}
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends string | number">
import { computed, ref, toRef } from "vue";
import { isClient } from "@2000-ui/utils";
import { useResizeObserver } from "@vueuse/core";
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

const autoAdjust = toRef(props.autoAdjust);
const minRows = computed(() => {
  if (autoAdjust.value && typeof autoAdjust.value === "object") {
    return autoAdjust.value?.minRows;
  }
  return undefined;
});

const mirrorMinHeight = ref();
const mirrorMaxHeight = ref();

const textareaWrapperElRef = ref<HTMLDivElement>();
const textareaElRef = ref<HTMLTextAreaElement>();
function updateTextareaMirrorStyle() {
  if (!textareaElRef.value || !isClient || !autoAdjust.value || typeof autoAdjust.value === "boolean") {
    return;
  }
  const { lineHeight: styleLineHeight, paddingTop: stylePaddingTop, paddingBottom: stylePaddingBottom } = window.getComputedStyle(textareaElRef.value);
  const paddingTop = Number(stylePaddingTop.slice(0, -2));
  const paddingBottom = Number(stylePaddingBottom.slice(0, -2));
  const lineHeight = Number(styleLineHeight.slice(0, -2));
  if (autoAdjust.value.minRows) {
    const minRows = Math.max(autoAdjust.value.minRows, 1);
    mirrorMinHeight.value = `${paddingTop + paddingBottom + lineHeight * minRows}px`;
  }
  if (autoAdjust.value.maxRows) {
    mirrorMaxHeight.value = `${paddingTop + paddingBottom + lineHeight * autoAdjust.value.maxRows}px`;
  }
}

useResizeObserver(textareaWrapperElRef, () => {
  updateTextareaMirrorStyle();
});

function onChange(e: Event) {
  emit("change", (e.currentTarget as HTMLTextAreaElement).value as T);
}
</script>

<style scoped>
.z-textarea-mirror {
  min-height: v-bind(mirrorMinHeight);
  max-height: v-bind(mirrorMaxHeight);
}
</style>
