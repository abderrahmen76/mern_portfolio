const mongoose = require("mongoose");

const introSchema = new mongoose.Schema({
  lottieUrl: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  cvButton: {
    type: String,
    required: true,
  },
});

const aboutSchema = new mongoose.Schema({
  aboutDesc: {
    type: String,
    required: true,
  },
  yellowHilights: {
    type: [String], // Array of strings
    required: true,
  },
  boldHilights: {
    type: [String], // Array of strings
    required: true,
  },
});

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageSrc: {
    type: String, // URL or file path for the image
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
});

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  technologies: [
    {
      type: String,
      required: true,
    },
  ],
  link: {
    type: String,
    required: true,
  },
  media: [
    {
      type: String,
      required: true, // Assuming media URLs (images, videos)
    },
  ],
});

const contactSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)+[a-zA-Z]{2,})$/,
      "Please enter a valid email address",
    ],
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = {
  Intro: mongoose.model("intros", introSchema),
  About: mongoose.model("abouts", aboutSchema),
  Skill: mongoose.model("skills", skillSchema),
  Project: mongoose.model("projects", projectSchema),
  Contact: mongoose.model("contacts", contactSchema),
};
