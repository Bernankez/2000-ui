<template>
  <button>
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
