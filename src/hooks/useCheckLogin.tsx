import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../services/apiAuth";

function useCheckLogin() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    async function getData() {
      const user = await getCurrentUser();
      if (user ? true : false) {
        setIsAuthenticated(user ? true : false);
      } else {
        navigate("/login");
      }
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isAuthenticated };
}

export default useCheckLogin;
