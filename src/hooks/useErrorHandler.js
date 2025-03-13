import { useEffect } from "react";
import { toast } from "react-toastify";

const useApiErrorHandler = (error) => {
  console.log("Error Hook Triggered:", error);
  useEffect(() => {
    if (!error) return;
    const errorMessage = error?.data?.message || error?.error || "Something went wrong";
    toast.error(errorMessage);
  }, [error]);
};

export default useApiErrorHandler;