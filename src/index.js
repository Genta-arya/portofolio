import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./components/NotFound";
import { store } from "./Redux/store";
import { Provider } from "react-redux";
import PageDashboard from "./Admin/Dashboard/Page";
import AuthPage from "./Admin/Auth/Page";
import DetailProject from "./DetailProject/Page";
import PageProject from "./ListProject/Page";
import ReactGA from "react-ga4";
import JasaPage from "./Jasa/Page";
const root = ReactDOM.createRoot(document.getElementById("root"));
ReactGA.initialize("G-Y86XN55NYN");
ReactGA.send({
  hitType: "pageview",
  page: window.location.pathname,
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: <PageDashboard />,
  },
  {
    path: "*",
    element: <NotFound />,
  },

  {
    path: "/project",
    element: <PageProject />,
  },
  {
    path: "/project/:name/:id",
    element: <DetailProject />,
  },
  {
    path: "/login",
    element: <AuthPage />,
  },

  {
    path: "/login",
    element: <AuthPage />,
  },
  {
    path: "/jasa",
    element: <JasaPage />,
  },
]);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
