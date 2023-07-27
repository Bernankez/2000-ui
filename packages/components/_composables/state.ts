import { type MaybeRefOrGetter, type Ref, computed, toValue, watch } from "vue";

export function useMergedState<T>(controlledRef: MaybeRefOrGetter<T | undefined>, uncontrolledRef: Ref<T>, onSet?: (value: T) => void) {
  watch(() => toValue(controlledRef), (value) => {
    if (value !== undefined) {
      uncontrolledRef.value = value;
    }
  });

  return computed({
    get() {
      const value = toValue(controlledRef);
      if (value === undefined) {
        return uncontrolledRef.value;
      }
      return value;
    },
    set(value) {
      if (onSet) {
        onSet(value);
      }
      uncontrolledRef.value = value;
    },
  });
}
