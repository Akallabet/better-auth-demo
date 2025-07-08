import { createBrowserRouter } from "react-router";
import { HomePage } from "./home";
import { RootPage } from "./root";

async function getHealthCheck() {
  // Simulate a health check
  const response = await fetch("/api/health");
  if (!response.ok) {
    throw new Error("Health check failed");
  }
  return response.json();
}

export const router = createBrowserRouter([
  {
    path: "/",

    Component: RootPage,
    children: [
      {
        index: true,
        loader: getHealthCheck,
        Component: HomePage,
      },
    ],
  },
]);
