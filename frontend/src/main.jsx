import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import ProjectProvider from "./context/ProjectProvider";
import "./index.css";
import router from "./router/Router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProjectProvider>
      <RouterProvider router={router} />
    </ProjectProvider>
  </StrictMode>
);
