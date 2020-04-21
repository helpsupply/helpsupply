export const routeWithParams = (route, params) => {
  const routeSections = route.split('/');

  const newRouteArray = routeSections.map((routeSection) => {
    if (routeSection.startsWith(':')) {
      if (!params) {
        return undefined;
      }
      const routeParam = routeSection.split(':')[1].replace('?', '');
      const matchedParam = params[routeParam];

      if (!matchedParam) {
        console.error(
          `routeWithParams ERROR: There is no matching parameter for :${routeParam}`,
        );
        return undefined;
      }

      return params[routeParam];
    }

    return routeSection;
  });

  return newRouteArray.join('/');
};
