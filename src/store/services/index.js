import cookie from "react-cookies";
import Swal from 'sweetalert2'

export const setToken = (token) => {
  return cookie.save("token", token, { path: "/" });
};

export const setUser = (user) => {
  return cookie.save("user", user, { path: "/" });
};


export const getToken = () => {
  return cookie.load("token");
};

export const getUser = () => {
  return cookie.load("user");
};

export const removeToken = () => {
    return cookie.remove('token', { path: '/' })
}

export const removeUser = () => {
  return cookie.remove('user', { path: '/' })
}

export const toster = (status,message) =>{
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  Toast.fire({
    icon: status,
    title: message
  })
}