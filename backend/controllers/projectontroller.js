const Project = require("../models/projectModel");
const mongoose = require("mongoose");

// get all projects
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// get single project
const getSingleProject = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ message: "Invalid ID" });
  }

  const project = await Project.findById(id);

  if (!project) {
    res.status(404).json({ message: "Project not found" });
  }

  res.status(200).json(project);
};

// create project
const postProject = async (req, res) => {
  const data = req.body;

  try {
    const project = await Project.create({
      ...data,
    });

    res.status(200).json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// delete project
const deleteProject = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ message: "Invalid ID" });
  }

  const project = await Project.findOneAndDelete({ _id: id });

  if (!project) {
    res.status(404).json({ message: "Project not found" });
  }

  res.status(200).json(project);
};

// update project
const updateProject = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ message: "Invalid ID" });
  }

  const project = await Project.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );

  if (!project) {
    res.status(404).json({ message: "Project not found" });
  }

  res.status(200).json(project);
};

module.exports = {
  getAllProjects,
  getSingleProject,
  postProject,
  deleteProject,
  updateProject,
};
