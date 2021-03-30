import { useEffect } from "react";
import auth from "../../services/authService";
function Logout() {
  useEffect(() => {
    auth.logout();
    window.location = "/Login";
  }, []);
  return null;
}

export default Logout;
