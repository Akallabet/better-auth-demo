import { createBrowserRouter } from "react-router";
import { HomePage } from "./home";
import { RootPage } from "./root";
import { LoginPage } from "./login";
import { AcceptInvitationPage } from "./accept-invitation";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootPage,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "login",
        Component: LoginPage,
      },
      {
        path: "accept-invitation",
        Component: AcceptInvitationPage,
      },
    ],
  },
]);
