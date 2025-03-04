import { useContext } from "react";
import { ProjectContext } from "../context/ProjectProvider";

const useProjectContext = () => {
  const context = useContext(ProjectContext);
  return context;
};

export default useProjectContext;
