import { Route } from "react-router-dom";

export const renderRoutes = (routes: any) => {
  return routes.map((route: any, index: any) => {
    return (
      <Route key={index} path={route.path} element={<route.component />} />
    );
  });
};
