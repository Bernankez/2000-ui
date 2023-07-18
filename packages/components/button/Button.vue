<template>
  <button class="z-bg-base-100 z-text-base-content active:z-bg-base-200">
    <slot>{{ title }}</slot>
  </button>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title?: string;
}>(), {
  title: "title",
});

defineEmits<{
  click: [e:PointerEvent];
}>();
</script>
