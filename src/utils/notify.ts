import { toast } from "react-toastify";

const notifyWarning = (message) => toast.warning(message);
const notifySuccess = (message) => toast.success(message);
const notifyError = (message) => toast.error(message);
const notifyInfo = (message) => toast.info(message);


export { notifyWarning, notifySuccess, notifyError, notifyInfo };
