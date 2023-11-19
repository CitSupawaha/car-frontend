import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import DetailProduct from "../components/DetailProduct";
import AnonymousLayout from "../layouts/AnonymousLayout";
import Login from "../pages/Login";
import { renderRoutes } from "./generate-routes";
import Resgister from "../pages/Resgister";
import Slip from "../components/Slip";

export const routes = [
  {
    layout: MainLayout,
    routes: [
      {
        name: "home",
        title: "Home page",
        component: Home,
        path: "/",
      },
      {
        name: "product-key",
        title: "product page",
        component: DetailProduct,
        path: "/product",
      },
      {
        name: "slip",
        title: "slip",
        component: Slip,
        path: '/slip'
      }
    ],
  },
  {
    layout: AnonymousLayout,
    routes: [
      {
        name: "login",
        title: "Login page",
        component: Login,
        path: "/login",
        isPublic: true
      },
    ],
  },
  {
    layout: Resgister,
    routes: [
      {
        name: "resgister",
        title: "Register page",
        component: Resgister,
        path: "/register",

      }
    ]
  }
];

export const Routes = renderRoutes(routes);
