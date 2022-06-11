import { toast } from 'react-toastify';

export const toastify = (message, type = 'error') => {
  const config = {
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  };

  if (type === 'success') {
    toast.success(message, config);
  }

  if (type === 'error') {
    toast.error(message, config);
  }
};
