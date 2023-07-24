<template>
  <div class="z-m-3">
    <h1 class="z-font-semibold z-text-9">
      Button
    </h1>
    <ZButton type="default" icon="info">
      Hello world 你好
    </ZButton>
    <ZButton type="primary" tag="a" icon="success">
      Hello world 你也好
    </ZButton>
    <ZButton disabled type="success" tag="a" icon="error">
      Hello world 你不太好
    </ZButton>
  </div>
</template>

<script setup lang="ts">
import { ZButton } from "./index";
</script>
