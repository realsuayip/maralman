export function matchRoute(route, namespace) {
  return route.id && route.id.startsWith(`/(${namespace})/`);
}
