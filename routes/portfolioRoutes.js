const router = require("express").Router();
const { ProjectS, contactS } = require("../models/portfolioModel");

const {
  Intro,
  About,
  Skill,
  Project,
  Contact,
} = require("../models/portfolioModel");

const User = require("../models/userModel");

router.get("/get-portfolio-data", async (req, res) => {
  try {
    const intros = await Intro.find();
    const abouts = await About.find();
    const skills = await Skill.find();
    const projects = await Project.find();
    const contacts = await Contact.find();

    res.status(200).send({
      intro: intros,
      about: abouts,
      skills: skills,
      project: projects,
      contacts: contacts,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// update intro
router.post("/update-intro", async (req, res) => {
  try {
    console.log("Received data:", req.body); // Log incoming request body

    if (!req.body._id) {
      return res
        .status(400)
        .send({ success: false, message: "ID is required" });
    }

    const intro = await Intro.findOneAndUpdate(
      { _id: req.body._id }, // Filter by the provided _id
      req.body,
      { new: true } // Return the updated document
    );

    if (intro) {
      res.status(200).send({
        data: intro,
        success: true,
        message: "Intro updated successfully",
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Intro update failed",
      });
    }
  } catch (error) {
    console.error("Error updating intro:", error); // Log errors
    res.status(500).send({ error: error.message });
  }
});

router.post("/update-about", async (req, res) => {
  try {
    const { _id, ...rest } = req.body;

    if (!_id) {
      return res
        .status(400)
        .send({ success: false, message: "ID is required" });
    }

    const about = await About.findOneAndUpdate({ _id }, rest, { new: true });

    if (about) {
      res.status(200).send({
        data: about,
        success: true,
        message: "About updated successfully",
      });
    } else {
      res.status(400).send({
        success: false,
        message: "About update failed",
      });
    }
  } catch (error) {
    console.error("Error updating about:", error);
    res.status(500).send({ error: error.message });
  }
});

// Add skill
router.post("/add-skill", async (req, res) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(200).send({
      success: true,
      data: skill,
      message: "Skill added successfully",
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Update skill
router.post("/update-skill", async (req, res) => {
  try {
    const { _id, ...rest } = req.body;
    if (!_id) {
      return res
        .status(400)
        .send({ success: false, message: "ID is required" });
    }
    const skill = await Skill.findOneAndUpdate({ _id }, rest, { new: true });
    res.status(200).send({
      success: true,
      data: skill,
      message: "Skill updated successfully",
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Delete skill
router.post("/delete-skill", async (req, res) => {
  try {
    const { _id } = req.body;
    if (!_id) {
      return res
        .status(400)
        .send({ success: false, message: "ID is required" });
    }
    await Skill.findByIdAndDelete(_id);
    res
      .status(200)
      .send({ success: true, message: "Skill deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Fetch all projects
router.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).send(projects);
  } catch (error) {
    res.status(500).send({ message: "Error fetching projects" });
  }
});

// Add a new project
router.post("/projects", async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).send({ success: true, data: project });
  } catch (error) {
    res.status(500).send({ message: "Error adding project" });
  }
});

// Update a project by ID
router.put("/projects/:id", async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).send({ success: true, data: updatedProject });
  } catch (error) {
    res.status(500).send({ message: "Error updating project" });
  }
});

// Delete a project by ID
router.delete("/projects/:id", async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.status(200).send({ success: true, message: "Project deleted" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting project" });
  }
});

// Add contact
router.post("/add-contact", async (req, res) => {
  try {
    const { fullName, email, message, date } = req.body;
    const contact = new Contact({
      fullName,
      email,
      message,
      date,
    });

    await contact.save();
    res.status(200).send({
      success: true,
      data: contact,
      message: "Contact added successfully",
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Update contact
router.post("/update-contact", async (req, res) => {
  try {
    const { _id, fullName, email, message, date } = req.body;

    if (!_id) {
      return res
        .status(400)
        .send({ success: false, message: "ID is required" });
    }

    const contact = await Contact.findByIdAndUpdate(
      _id,
      { fullName, email, message, date },
      { new: true }
    );

    res.status(200).send({
      success: true,
      data: contact,
      message: "Contact updated successfully",
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// admin login
router.post("/admin-login", async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log("Attempting login with:", { username, password });

    const user = await User.findOne({
      username: username,
      password: password,
    });

    console.log("User found:", user);
    user.password = "";
    if (user) {
      return res.status(200).send({
        data: user,
        success: true,
        message: "Login successful",
      });
    } else {
      return res.status(200).send({
        data: null,
        success: false,
        message: "Invalid username or password",
      });
    }
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
