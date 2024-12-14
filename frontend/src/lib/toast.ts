import Swal from "sweetalert2";

export const Alert = (
  title: string,
  text: string,
  icon: "error" | "success" | "warning" | "info" | "question"
) => {
  Swal.fire({ title, text, icon, confirmButtonText: "OK" });
};

export const toast = {
  error: (failMessage: string) => {
    Alert("Failed", failMessage, "error");
  },

  success: (successMessage: string) => {
    Alert("Success", successMessage, "success");
  },
};
