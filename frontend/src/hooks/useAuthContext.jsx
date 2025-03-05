import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const useProjectContext = () => {
  const context = useContext(AuthContext);
  return context;
};

export default useProjectContext;
