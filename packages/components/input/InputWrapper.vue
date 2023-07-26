<template>
  <div class="z-max-w-full">
    <div
      class="z-rounded-[var(--rounded-btn)] z-overflow-hidden z-inline-flex z-flex-gap-2 z-b-solid z-b-2 z-b-primary z-bg-base-50 z-text-base-content z-cursor-text z-shadow-primary focus-within:z-shadow-sm z-p-x-2 z-box-border"
      :class="[disabled ? 'z-cursor-not-allowed' : '', autoAdjust ? '' : 'z-w-full', type === 'textarea' ? 'z-resize-y' : '']"
    >
      <slot></slot>
      <div v-if="showSuffix" class="z-flex-gap-2 z-flex">
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
