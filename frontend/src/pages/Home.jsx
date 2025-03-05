import React, { useEffect } from "react";
import ProjectCard from "../components/ProjectCard";
import ProjectForm from "../components/ProjectForm";
import useProjectContext from "../hooks/useProjectContext";

const Home = () => {
  const { projects, dispatch } = useProjectContext();

  useEffect(() => {
    const getAllProjects = async () => {
      const res = await fetch("http://localhost:8400/api/projects");
      const data = await res.json();
      if (res.ok) {
        dispatch({ type: "GET_PROJECT", payload: data });
      }
    };

    getAllProjects();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="container mx-auto flex gap-4">
        <div className="left w-2/3">
          <h2 className="text-3xl text-sky-500 font-semibold mt-5">
            All project
          </h2>

          <div className="grid grid-cols-2 gap-3 my-5">
            {projects?.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-3xl text-sky-500 font-semibold mt-5">
            Add a new project
          </h2>
          <ProjectForm submitText="Add a Project" />
        </div>
      </div>
    </div>
  );
};

export default Home;
