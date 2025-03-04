const express = require("express");
const {
  postProject,
  getAllProjects,
  getSingleProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectontroller");
const router = express.Router();

router.get("/", getAllProjects);
router.get("/:id", getSingleProject);
router.post("/", postProject);
router.delete("/:id", deleteProject);
router.patch("/:id", updateProject);

module.exports = router;
