import moment from "moment";
import React, { useState } from "react";
import useProjectContext from "../hooks/useProjectContext";
import currencyFormatter from "../utils/currencyFormatter";
import ProjectForm from "./ProjectForm";

const ProjectCard = ({ project }) => {
  const [openModal, setOpenModal] = useState(false);
  const [openOverlay, setOpenOverlay] = useState(false);
  const { dispatch } = useProjectContext();
  const {
    _id,
    title,
    tech,
    budget,
    manager,
    dev,
    duration,
    createdAt,
    updatedAt,
  } = project;

  const handleDeleteProject = async () => {
    const res = await fetch(`http://localhost:8400/api/projects/${_id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!res.ok) {
      alert(data.message);
    }
    if (res.ok) {
      dispatch({ type: "DELETE_PROJECT", payload: _id });
    }
  };

  const handleUpdate = () => {
    setOpenModal(true);
    setOpenOverlay(true);
  };
  const handleOverlay = () => {
    setOpenModal(false);
    setOpenOverlay(false);
  };

  return (
    <div className="project-card flex flex-col gap-5 bg-slate-700 p-4 rounded-xl">
      <div className="top">
        <p className="text-sky-500">ID: {_id}</p>
        <h1 className="text-3xl font-semibold truncate">{title}</h1>
        <span className="text-sm uppercase text-slate-400">{tech}</span>
      </div>
      <div className="mid flex items-center justify-between">
        <div className="left flex flex-col gap-1">
          <span>Budget: {currencyFormatter(budget)}</span>
          <span>Duration: {`${duration} week${duration == 1 ? "" : "s"}`}</span>
          <span>Developer: {dev} person</span>
        </div>
        <div className="right flex flex-col gap-1">
          <span>Manager: {manager}</span>
          <span>Added: {moment(createdAt).format("Do MMM hh:mm A")}</span>
          <span>Updated: {moment(updatedAt).format("Do MMM hh:mm A")}</span>
        </div>
      </div>
      <div className="bottom flex items-center gap-2">
        <button
          onClick={handleUpdate}
          className="bg-sky-500 hover:bg-sky-700 px-3 py-2 rounded font-semibold w-full"
        >
          Update
        </button>
        <button
          onClick={handleDeleteProject}
          className="bg-rose-500 hover:bg-rose-700 px-3 py-2 rounded font-semibold w-full"
        >
          Delete
        </button>
      </div>

      {/* Overlay */}
      <div
        onClick={handleOverlay}
        className={`overlay fixed top-0 left-0 h-screen w-screen bg-slate-800/50 backdrop-blur-sm ${
          openOverlay ? "" : "hidden"
        }`}
      ></div>
      {/* Modal */}
      <div
        className={`modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-700 p-4 rounded-xl z-10 ${
          openModal ? "" : "hidden"
        }`}
      >
        <h1 className="text-3xl font-semibold text-center">Update Project</h1>
        <ProjectForm
          project={project}
          setOpenModal={setOpenModal}
          setOpenOverlay={setOpenOverlay}
          submitText="Update Project"
        />
      </div>
    </div>
  );
};

export default ProjectCard;
