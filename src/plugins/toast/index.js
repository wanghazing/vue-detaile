import Swal from "sweetalert2";

export function Alert(options) {
  return Swal.fire({
    ...options,
    toast: false,
    icon: options.type,
    customClass: {
      popup: "ui-ft-30-important",
    },
  });
}
export function Toast(options) {
  return Swal.fire({
    timer: 3000,
    ...options,
    toast: true,
    icon: options.type,
    showConfirmButton: false,
    showCancelButton: false,
    customClass: {
      popup: "ui-ft-30-important",
    },
  });
}

export default {
  install(app) {
    app.config.globalProperties.$alert = Alert;
    app.config.globalProperties.$toast = Toast;
  },
};
