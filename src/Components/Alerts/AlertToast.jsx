import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AlertToast = (type = "", message) => {
  toast(message, {
    position: "top-right",
    autoClose: 3500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    type: type,
  });
};
