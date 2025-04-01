import { toast } from 'react-toastify';
import {TIME_CLOSE_TOAST} from "./constant";

const defaultOptions = {
    position: "top-right",
    autoClose: TIME_CLOSE_TOAST,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light"
};

export const ToastService = {
    showSuccess(message) {
        toast.success(message, defaultOptions);
    },
    showError(message) {
        toast.error(message, defaultOptions);
    },
    showInfo(message) {
        toast.info(message, defaultOptions);
    },
    showWarning(message) {
        toast.warn(message, defaultOptions);
    },
};