export function formHandler() {
  let loading = $state(false);
  return {
    get loading() {
      return loading;
    },
    enhance: () => {
      loading = true;
      return async ({ update }) => {
        await update();
        loading = false;
      };
    },
  };
}
