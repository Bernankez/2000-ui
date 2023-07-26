<template>
  <div class="z-flex z-select-none z-text-4 z-text-base-400 z-items-center" @click="emit('click', $event)">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  click: [e: MouseEvent];
}>();
</script>
