export const routeWithParams = (route, params) => {
  const routeSections = route.split('/');

  const newRouteArray = routeSections.map((routeSection) => {
    if (routeSection.startsWith(':')) {
      const routeParam = routeSection.split(':')[1];
      const matchedParam = params[routeParam];

      if (!matchedParam) {
        console.error(
          `routeWithParams ERROR: There is no matching parameter for :${routeParam}`,
        );
      }

      return params[routeParam];
    } else {
      return routeSection;
    }
  });

  return newRouteArray.join('/');
};
