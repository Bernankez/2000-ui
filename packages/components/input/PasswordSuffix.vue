<template>
  <div class="z-flex z-cursor-pointer z-items-center" @mousedown="emit('mousedown', $event)" @click="emit('click', $event)">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  mousedown: [e: MouseEvent];
  click: [e: MouseEvent];
}>();
</script>
