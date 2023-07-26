<template>
  <div class="z-items-center z-cursor-pointer z-flex" @mousedown="emit('mousedown', $event)" @click="emit('click', $event)">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  mousedown: [e: MouseEvent];
  click: [e: MouseEvent];
}>();
</script>
