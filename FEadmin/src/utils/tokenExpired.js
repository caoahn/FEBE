import { jwtDecode } from "jwt-decode";

const isTokenExpired = (token) => {
  if (!token) return true;
  const { exp } = jwtDecode(token);
  return exp * 1000 < Date.now();
};

export { isTokenExpired };
