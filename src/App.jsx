import React from "react";
import { Bounce, ToastContainer } from "react-toastify";
import { useRoutes } from "react-router";
import routes from "./routes/routes";

const App = () => {
  const content = useRoutes(routes);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      {content}
    </>
  );
};

export default App;
