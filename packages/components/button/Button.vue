<template>
  <component :is="tag" role="button" :disabled="disabled" class="z-rounded-[var(--rounded-btn)] z-leading-[1] z-cursor-pointer z-select-none active:z-scale-[var(--btn-focus-scale)] z-btn z-transition-duration-[var(--animation-btn)] z-p-x-3 z-p-y-2 z-shadow-[var(--shadow-btn)]" :class="[typeClass, disabled ? 'z-btn-disabled' : '', block ? 'z-block' : 'z-inline-block']" @click="click">
    <slot name="icon">
      <div class="z-inline-block" :class="[iconClass]"></div>
    </slot>
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { ButtonProps } from "./types";

const props = withDefaults(defineProps<ButtonProps>(), {
  type: "default",
  default: false,
  tag: "button",
  block: false,
});

const emit = defineEmits<{
  click: [e:MouseEvent];
}>();

const iconClass = computed(() => {
  switch (props.icon) {
    case "success":
      return "i-ic:baseline-check";
    case "error":
      return "i-ic:baseline-clear";
    case "warning":
      return "i-ic:baseline-warning-amber";
    case "info":
      return "i-ic:outline-info";
    default:
      return "";
  }
});

const typeClass = computed(() => {
  if (props.type === "default") {
    return "z-btn-base";
  }
  return `z-btn-${props.type}`;
});

function click(e: MouseEvent) {
  if (!props.disabled) {
    emit("click", e);
  }
}
</script>

<style scoped>
.z-btn {
  text-transform: var(--btn-text-case);
}

.z-btn-disabled {
  @apply z-bg-opacity-50! z-text-opacity-50! active:z-scale-100! z-cursor-not-allowed!;
}

.z-btn-base {
  @apply z-bg-base-100 hover:z-bg-base-200 z-text-base-content;
}

.z-btn-primary {
  @apply z-bg-primary hover:z-bg-primary-focus z-text-primary-content;
}

.z-btn-secondary {
  @apply z-bg-secondary hover:z-bg-secondary-focus z-text-secondary-content;
}

.z-btn-accent {
  @apply z-bg-accent hover:z-bg-accent-focus z-text-accent-content;
}

.z-btn-neutral {
  @apply z-bg-neutral hover:z-bg-neutral-focus z-text-neutral-content;
}

.z-btn-info {
  @apply z-bg-info hover:z-bg-info-focus z-text-info-content;
}

.z-btn-success {
  @apply z-bg-success hover:z-bg-success-focus z-text-success-content;
}

.z-btn-warning {
  @apply z-bg-warning hover:z-bg-warning-focus z-text-warning-content;
}

.z-btn-error {
  @apply z-bg-error hover:z-bg-error-focus z-text-error-content;
}
</style>
