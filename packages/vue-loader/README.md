# 2000-ui/vue-loader

A Node.js loader for compiling Vue files.

Requires Node >= 18

## Usage

`./index.js`

```ts
export { default as Button } from "./Button.vue";
```

`./Button.vue`

```vue
<template>
  <button>
    <slot>{{ title }}</slot>
  </button>
</template>

<script setup>
defineProps(["title"]);
</script>
```

```sh
node --require @2000-ui/vue-loader/suppress-warnings --experimental-loader @2000-ui/vue-loader ./index.js
```

If you are using `TypeScript`, you need to install `@esbuild-kit/esm-loader` or `tsx` manually.

```sh
pnpm add -D @esbuild-kit/esm-loader
```

```sh
node --require @2000-ui/vue-loader/suppress-warnings --experimental-loader @2000-ui/vue-loader --experimental-loader @esbuild-kit/esm-loader ./index.ts
```

Or
```sh
pnpm add -D tsx
```

```sh
node --require @2000-ui/vue-loader/suppress-warnings --experimental-loader @2000-ui/vue-loader --experimental-loader tsx ./index.ts
```
