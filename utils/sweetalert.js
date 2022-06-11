import Swal from 'sweetalert2';

export const sweetAlert = (message, type = 'success') => {
  if (type === 'error') {
    Swal.fire({
      title: 'Error!',
      text: message,
      icon: 'error',
    });
  }

  if (type === 'success') {
    Swal.fire({
      title: 'Success!',
      text: message,
      icon: 'success',
    });
  }
};
