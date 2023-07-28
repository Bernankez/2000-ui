<template>
  <div class="z-m-3">
    <h1 class="z-text-9 z-font-semibold">
      Button
    </h1>
    <div class="z-flex z-flex-wrap z-flex-gap-2">
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
    </div>
    <h1 class="z-text-9 z-font-semibold">
      Input
    </h1>
    <div class="z-flex z-flex-col z-flex-gap-4">
      <ZInput show-password-on="click" style="min-width: 40px;" show-count type="input" auto-adjust placeholder="hello" :minlength="2" :maxlength="999" @change="onInput" />
      <ZInput show-password-on="click" style="min-width: 40px;" show-count type="password" auto-adjust placeholder="hello" :minlength="2" :maxlength="999" @change="onInput" />
      <ZInput style="min-width: 40px;" show-count type="input" placeholder="hello" :minlength="2" :maxlength="999" @change="onInput" />
      <ZInput type="textarea" show-count placeholder="hello" :minlength="2" :maxlength="999" @change="onInput" />
      <ZInput type="textarea" show-count :auto-adjust="{ minRows: 5, maxRows: 10 }" placeholder="hello" :minlength="2" :maxlength="999" @change="onInput" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ZButton, ZInput } from "./index";

function onInput(v: string) {
  console.log(v);
}
</script>
