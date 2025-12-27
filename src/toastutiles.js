// src/utils/toastUtils.js
export const showToast = (toast, type, message, options = {}) => {
    const defaultOptions = {
      position: "top-right",
      timeout: 3000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    };
  
    // Merge default options with custom options
    const finalOptions = { ...defaultOptions, ...options };
  
    switch (type) {
      case 'success':
        toast.success(message, finalOptions);
        break;
      case 'error':
        toast.error(message, finalOptions);
        break;
      case 'info':
        toast.info(message, finalOptions);
        break;
      case 'warning':
        toast.warning(message, finalOptions);
        break;
      default:
        console.error('Invalid toast type');
    }
  };
  