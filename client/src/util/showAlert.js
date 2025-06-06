import Swal from "sweetalert2";

// Helpers to show alerts using SweetAlert2
// These functions can be used to display different types of alerts in the application
export const showSuccessAlert = (isLogin) =>
  Swal.fire({
    icon: "success",
    title: isLogin ? "Welcome back!" : "Registration successful!",
    text: isLogin
      ? "You have successfully logged in."
      : "You have successfully registered.",
    confirmButtonText: "OK",
    confirmButtonColor: "#3085d6",
  });

export const showErrorAlert = (text) =>
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text,
    confirmButtonText: "OK",
    confirmButtonColor: "#d33",
  });

export const showEmailExistsAlert = () =>
  Swal.fire({
    icon: "error",
    title: "Oops",
    text: "This email is already registered. Please log in or use a different email.",
    confirmButtonText: "OK",
    confirmButtonColor: "#d33",
  });
