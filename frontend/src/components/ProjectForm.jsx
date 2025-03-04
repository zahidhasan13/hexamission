import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useProjectContext from "../hooks/useProjectContext";

function ProjectForm({ project, submitText, setOpenModal, setOpenOverlay }) {
  const { dispatch } = useProjectContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: project
      ? {
          _id: project._id,
          title: project.title,
          tech: project.tech,
          budget: project.budget,
          duration: project.duration,
          manager: project.manager,
          dev: project.dev,
        }
      : {},
  });

  useEffect(() => {
    if (project) {
      reset({
        _id: project._id,
        title: project.title,
        tech: project.tech,
        budget: project.budget,
        duration: project.duration,
        manager: project.manager,
        dev: project.dev,
      });
    }
  }, [project, reset]);

  const onSubmit = async (projectData) => {
    if (!project) {
      const res = await fetch("http://localhost:8400/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
      }
      if (res.ok) {
        dispatch({ type: "ADD_PROJECT", payload: data });
      }
      reset();
      return;
    }

    if (project) {
      const res = await fetch(
        `http://localhost:8400/api/projects/${projectData._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(projectData),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        alert(data.message);
      }
      if (res.ok) {
        dispatch({ type: "UPDATE_PROJECT", payload: data });
      }
      reset();
      setOpenModal(false);
      setOpenOverlay(false);
      return;
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-6 bg-slate-700 rounded-xl shadow-md mt-5"
    >
      {/* ... (rest of your form inputs) ... */}
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-white text-sm font-bold mb-2"
        >
          Title:
        </label>
        <input
          type="text"
          id="title"
          placeholder="e.g: E-commerce website"
          {...register("title", { required: "Title is required" })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-400 leading-tight focus:outline-none focus:border focus:border-sky-500"
        />
        {errors.title && (
          <p className="text-red-500 text-xs italic">{errors.title.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="tech"
          className="block text-white text-sm font-bold mb-2"
        >
          Technologies:
        </label>
        <input
          type="text"
          id="tech"
          placeholder="e.g: React, Node, MongoDB"
          {...register("tech", { required: "Technologies are required" })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-400 leading-tight focus:outline-none focus:border focus:border-sky-500"
        />
        {errors.tech && (
          <p className="text-red-500 text-xs italic">{errors.tech.message}</p>
        )}
      </div>

      <div className="mb-4 flex space-x-4">
        <div className="w-1/2">
          <label
            htmlFor="budget"
            className="block text-white text-sm font-bold mb-2"
          >
            Budget:
          </label>
          <input
            type="number"
            id="budget"
            placeholder="e.g: 448"
            {...register("budget", { required: "Budget is required", min: 0 })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-400 leading-tight focus:outline-none focus:border focus:border-sky-500"
          />
          {errors.budget && (
            <p className="text-red-500 text-xs italic">
              {errors.budget.message}
            </p>
          )}
        </div>

        <div className="w-1/2">
          <label
            htmlFor="duration"
            className="block text-white text-sm font-bold mb-2"
          >
            Duration (weeks):
          </label>
          <input
            type="number"
            id="duration"
            placeholder="e.g: 4"
            {...register("duration", {
              required: "Duration is required",
              min: 1,
            })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-400 leading-tight focus:outline-none focus:border focus:border-sky-500"
          />
          {errors.duration && (
            <p className="text-red-500 text-xs italic">
              {errors.duration.message}
            </p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label
          htmlFor="manager"
          className="block text-white text-sm font-bold mb-2"
        >
          Manager:
        </label>
        <input
          type="text"
          id="manager"
          placeholder="e.g: Manager Name"
          {...register("manager", { required: "Manager name is required" })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-400 leading-tight focus:outline-none focus:border focus:border-sky-500"
        />
        {errors.manager && (
          <p className="text-red-500 text-xs italic">
            {errors.manager.message}
          </p>
        )}
      </div>

      <div className="mb-6">
        <label
          htmlFor="dev"
          className="block text-white text-sm font-bold mb-2"
        >
          Developer (person):
        </label>
        <input
          type="number"
          id="dev"
          placeholder="e.g: 4"
          {...register("dev", { required: "Developer name is required" })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-400 leading-tight focus:outline-none focus:border focus:border-sky-500"
        />
        {errors.dev && (
          <p className="text-red-500 text-xs italic">{errors.dev.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
      >
        {submitText}
      </button>
    </form>
  );
}

export default ProjectForm;
