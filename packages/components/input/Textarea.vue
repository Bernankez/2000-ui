<template>
  <div ref="textareaWrapperElRef" class="z-overflow-hidden z-relative z-w-full">
    <textarea ref="textareaElRef" v-model="modelValue" :rows="minRows" class="z-w-full z-absolute z-left-0 z-top-0 z-h-full z-bg-inherit focus:z-outline-none z-resize-none z-whitespace-pre-wrap" :autofocus="autofocus" @change="onChange"></textarea>
    <div class="z-w-full z-h-full z-whitespace-pre-wrap z-pointer-events-none z-break-words z-invisible z-textarea-mirror">
      {{ `${modelValue ?? ""}\r\n` }}
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends string | number">
import { computed, onMounted, ref, toRef, watchEffect } from "vue";
import { isClient } from "@2000-ui/utils";
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
watchEffect(() => {
  console.log(mirrorMinHeight.value);
  console.log(mirrorMaxHeight.value);
});
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

onMounted(() => {
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      updateTextareaMirrorStyle();
    }
  });
  textareaWrapperElRef.value && resizeObserver.observe(textareaWrapperElRef.value);
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
