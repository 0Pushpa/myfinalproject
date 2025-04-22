import React, { Suspense } from "react";
import { Routes as RouterRoutes, Route } from "react-router-dom";
import { Routes as AppRoutes } from "../routes";

export default function RouteConfig() {
  const routes = AppRoutes();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterRoutes>
        {routes.map((route, index) => {
          const { path, element, children } = route;
          return (
            <Route key={index} path={path} element={element}>
              {children &&
                children.map((child, idx) => (
                  <Route key={idx} path={child.path} element={child.element} />
                ))}
            </Route>
          );
        })}
      </RouterRoutes>
    </Suspense>
  );
}

export function RouteWithSubRoutes(route) {
  const { path, element, children } = route;

  return (
    <Route path={path} element={element}>
      {children &&
        children.map((child, idx) => (
          <Route key={idx} path={child.path} element={child.element} />
        ))}
    </Route>
  );
}
