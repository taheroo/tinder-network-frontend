import API from "../api";

export function register(user) {
  return API.post("user/", {
    email: user.email,
    password: user.password,
    fullname: user.fullname,
  });
}
