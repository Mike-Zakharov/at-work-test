import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    lazy: async () => {
      const { App } = await import("./components/app/app");
      return { Component: () => <App /> };
    },
    children: [
      {
        path: "/",
        lazy: async () => {
          const { MainPage } = await import("./pages/main-page/main-page");
          return { Component: MainPage };
        },
      },
      {
        path: "/user/:id",
        lazy: async () => {
          const { UserInfoPage } =
            await import("./pages/user-info-page/user-info-page");
          return { Component: UserInfoPage };
        },
      },
    ],
  },
]);
