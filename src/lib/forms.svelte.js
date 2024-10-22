export function formHandler(reset = true) {
  let loading = $state(false);
  return {
    get loading() {
      return loading;
    },
    enhance: () => {
      loading = true;
      return async ({ update }) => {
        await update({ reset });
        loading = false;
      };
    },
  };
}
