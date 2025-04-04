import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import PaginaAdmin from "./components/PaginaAdmin.jsx";
import PaginaUser from "./components/PaginaUser.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/", //vai indicar o caminho da tela. só / faz ser a tela principal
    element: <App />,
  },
  {
    path: "/PaginaAdmin",
    element: <PaginaAdmin />,
  },
  {
    path: "/PaginaUser",
    element: <PaginaUser />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
