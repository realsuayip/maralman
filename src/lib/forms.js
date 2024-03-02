import { get } from "svelte/store";

export function propagateFieldErrors(errors, fields) {
  const $errors = get(errors);
  if (!$errors) {
    return;
  }
  const keys = Object.keys($errors);
  if (!keys) {
    return;
  }

  const initialErrors = { ...$errors };
  const initialValues = {};

  fields.subscribe((values) => {
    for (const key of keys) {
      const value = values[key];
      const initial = initialValues[key];

      if (initial === undefined) {
        // This is the initial subscription call,
        // assign initial values.
        initialValues[key] = value;
      } else {
        if (initial !== value) {
          // Initial value that caused the error changed,
          // remove the related error.
          errors.update((values) => {
            values[key] = [];
            return values;
          });
        } else {
          // The value is still the problematic initial
          // one, make the error reappear.
          errors.update((values) => {
            values[key] = initialErrors[key];
            return values;
          });
        }
      }
    }
  });
}
