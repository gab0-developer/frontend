import { toast } from 'react-toastify';

type ToastType = 'success' | 'error' | 'warning' | 'info';

export const showToast = (type: ToastType, message: string) => {
  toast[type](message, {
    position: 'top-right',
    autoClose: 3000,
  });
};