import JwtDecode from "jwt-decode";
import API from "../api";

const tokenKey = "token";

export async function login(user) {
  const { data: jwt } = await API.post("user/login", {
    email: user.email,
    password: user.password,
  });
  localStorage.setItem(tokenKey, jwt.token);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return JwtDecode(jwt);
  } catch (error) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt,
};
