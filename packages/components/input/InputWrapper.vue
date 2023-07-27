<template>
  <div class="z-max-w-full">
    <div
      class="z-box-border z-inline-flex z-cursor-text z-flex-gap-2 z-overflow-hidden z-b-2 z-b-primary z-rounded-[var(--rounded-btn)] z-b-solid z-bg-base-50 z-p-x-2 z-text-base-content z-shadow-primary focus-within:z-shadow-sm"
      :class="[disabled ? 'z-cursor-not-allowed' : '', autoAdjust && type !== 'textarea' ? '' : 'z-w-full', type === 'textarea' && !autoAdjust ? 'z-resize-y' : '']"
    >
      <slot></slot>
      <div v-if="showSuffix" class="z-flex z-flex-gap-2">
        <slot name="suffix"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { InputProps } from "./types";

defineProps<InputProps<any> & {
  showSuffix?: boolean;
}>();
</script>
