const mongoose = require("mongoose");
const Industry = require("../models/IndustrySchema");
const Soultion = require("../models/SolutionSchema");
const Solution = require("../models/SolutionSchema");
const SolutionPackage = require("../models/SolutionPackageSchema");
const solutionPackage = require("../models/SolutionPackageSchema");
// Sample data to feed into the collection
const industries = [
  {
    name: "Real Estate",
    solutions: [
      {
        name: "Home Automation",
        solutionPackage: [{ name: "HomeRework" }, { name: "HomeAuto" }],
      },
      {
        name: "Security Systems",
        solutionPackage: [{ name: "secureData" }, { name: "securitySetup" }],
      },
    ],
  },
  {
    name: "Transport",
    solution: [
      {
        name: "Public Transport",
        solutionPackage: [{ name: "publicTransport" }],
      },
    ],
  },
  {
    name: "Telemedicine",
    solutions: [
      {
        name: "Video Consultation",
        solutionPackage: [{ name: "zoomMeet" }, { name: "googleMeet" }],
      },
    ],
  },
];

// const solution = [
//   { name: "Smart Home" },
//   { name: "Smart Building" },
//   { name: "Smart Town/City" },
//   { name: "Smart Fleet" },
//   { name: "Public Transport" },
//   { name: "Logistics" },
//   { name: "Telemedicine" },
//   { name: "Electronic Health Records" },
//   { name: "Hospital Management" },
// ];
const solutionPackagesData = [{ name: "Home Automation" }];
// Save the sample data to the database
const addDefaultSampleData = async () => {
  try {
    Industry.insertMany(industries)
      .then(() => {
        console.log("Industries saved successfully");
      })
      .catch((err) => console.error("Error saving industries", err));
  } catch (err) {
    console.log("error occured while adding", err);
  }
};

module.exports = addDefaultSampleData;
