import { Outlet } from "react-router";
import Header from "../header/header";

function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export { App };
