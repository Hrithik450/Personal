import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/auth/authThunks";
import { toast } from "react-toastify";
import { alertObject } from "../constants";
import { useSearchParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const useCheckTokenExpiry = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));

    if (token) {
      const decoded = jwtDecode(token);
      const expiryTime = decoded.exp * 1000;
      const currentTime = Date.now();
      const timeLeft = expiryTime - currentTime;

      const oneMinuteBeforeExpiry = timeLeft - 60000;

      if (oneMinuteBeforeExpiry > 0) {
        const timer = setTimeout(async () => {
          toast.error("Session expired, please login again", alertObject);
          await dispatch(logout()).unwrap();
          setSearchParams({ authpage: "open", auth: "login" });
        }, oneMinuteBeforeExpiry);

        return () => clearTimeout(timer);
      } else if (timeLeft <= 0) {
        toast.error("Session expired, please login again", alertObject);
        dispatch(logout()).unwrap();
        setSearchParams({ authpage: "open", auth: "login" });
      }
    }
  }, [dispatch, searchParams, setSearchParams]);
};

export default useCheckTokenExpiry;
