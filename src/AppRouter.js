import React, { Suspense, Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import NotFound from "./views/errors/NotFound";


export default function AppRouter() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <RenderRoutes routes={routes} />
      </Suspense>
    </Router>
  );
};

function RenderRoutes({ routes }) {
  return (
    <Routes>
      {routes.map((route, i) => {
        const Component = route.component;
        const Layout = route.layout || Fragment;
        return (
          <Route
            key={i}
            path={route.path}
            element={

              <Layout>
                {route.routes ? (
                  <RenderRoutes routes={route.routes} />
                ) : (
                  <Component />
                )}
              </Layout>

            }
          />
        );
      })}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}


