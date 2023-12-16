import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Toast = () => {
  return (
    <ToastContainer
      position='top-right'
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme='light'
    />
  );
};
type ToastType = 'info' | 'success' | 'error' | 'warn';

const showToast = (message: string, type: ToastType) => {
  toast[type](message); // 4 types of message: info, success, error, warn
};
export { Toast, showToast };
