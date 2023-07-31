import type { StyleValue } from "vue";

export interface InputProps<T> {
  type?: "input" | "password" | "textarea";
  value?: T;
  placeholder?: string | number;
  disabled?: boolean;
  minlength?: number;
  maxlength?: number;
  autofocus?: boolean;
  autoAdjust?: boolean | { minRows?: number; maxRows?: number };
  rows?: number;
  showCount?: boolean;
  showPasswordOn?: "mousedown" | "click";
  style?: StyleValue;
}
