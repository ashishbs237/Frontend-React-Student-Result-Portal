import React from "react";
import { ToastContainer } from "react-toastify";
import { useRoutes } from "react-router";
import routes from "./routes/routes";

const App = () => {
  const content = useRoutes(routes);
  return (
    <>
      <ToastContainer />
      {content}
    </>
  );
};

export default App;
