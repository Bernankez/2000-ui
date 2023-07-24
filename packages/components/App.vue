<template>
  <div class="z-m-3">
    <h1 class="z-font-semibold z-text-9">
      Button
    </h1>
    <ZButton type="default" icon="info">
      Hello world 你好
    </ZButton>
    <ZButton type="neutral" tag="a" icon="success">
      Hello world 你也好
    </ZButton>
    <ZButton disabled type="success" tag="a" icon="error">
      Hello world 你不太好
    </ZButton>
    <ZButton type="error" icon="error" />
    <h1 class="z-font-semibold z-text-9">
      Input
    </h1>
    <ZInput placeholder="hello" />
  </div>
</template>

<script setup lang="ts">
import { ZButton, ZInput } from "./index";
</script>
