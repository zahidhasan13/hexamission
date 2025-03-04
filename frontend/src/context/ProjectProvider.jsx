import React, { createContext, useReducer } from "react";

const initialState = {
  projects: [],
};

export const ProjectContext = createContext();

const projectReducer = (state, action) => {
  switch (action.type) {
    case "GET_PROJECT":
      return {
        ...state,
        projects: action.payload,
      };

    case "ADD_PROJECT":
      return {
        ...state,
        projects: [action.payload, ...state.projects],
      };

    case "DELETE_PROJECT":
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project._id !== action.payload
        ),
      };
    case "UPDATE_PROJECT":
      return {
        ...state,
        projects: state.projects.map((project) =>
          project._id !== action.payload._id ? project : action.payload
        ),
      };

    default:
      return state;
  }
};

const ProjectProvider = ({ children }) => {
  const [state, dispatch] = useReducer(projectReducer, initialState);
  return (
    <ProjectContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectProvider;
