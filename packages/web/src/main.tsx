import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./routes";

const root = document.getElementById("root");

//@ts-expect-error ignore TS error for now
ReactDOM.createRoot(root).render(<RouterProvider router={router} />);
