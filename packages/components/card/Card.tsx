import { defineComponent } from "vue";

export default defineComponent({
  props: ["test"],
  emits: ["click"],
  template: "<div>Card</div>",
});
