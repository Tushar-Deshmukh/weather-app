import { lazy } from "react";
import HomeLayout from "src/layouts/HomeLayout";

export const routes = [
  {
    exact: true,
    path: "/",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/home/WheatherApp")),
  },

  {
    exact: true,
    path: "/view-wheather",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/home/ViewWheather")),
  },

  {
    exact: true,
    path: "/404",
    component: lazy(() => import("src/views/errors/NotFound")),
  },

];
