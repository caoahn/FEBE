// ProtectedRoute.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenExpired } from "../utils/tokenExpired";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo")); // Parse JSON thành object
  const token = userInfo?.accessToken; // Lấy token an toàn

  useEffect(() => {
    if (!userInfo) {
      navigate("/login", { replace: true });
    }
  }, [userInfo, navigate]);

  const isExpired = token ? isTokenExpired(token) : true;

  useEffect(() => {
    if (!token || isExpired) {
      localStorage.removeItem("userInfo");
      navigate("/login", { replace: true });
    }
  }, [token, isExpired, navigate]);

  return userInfo ? children : null;
};

export default ProtectedRoute;
