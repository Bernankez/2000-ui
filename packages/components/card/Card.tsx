import { defineComponent } from "vue";

export default defineComponent({
  props: ["test"],
  emits: ["click"],
  setup() {
    return <div class="rounded-1">Card</div>;
  },
});
