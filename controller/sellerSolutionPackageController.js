const SellerSolutionPackage = require("../models/SellerSolutionPackages");
const Industry = require("../models/IndustrySchema");
const path = require("path");
const fs = require("fs");

const createSellerSolutionPackage = async (req, res) => {
  try {
    const { name, industryId, solutionId, link, companyName, description } =
      req.body;
    console.log("request body===========", req.body);
    // Validate the required fields
    if (!name || !industryId || !solutionId) {
      return res
        .status(400)
        .json({ message: "Name, industryId, and solutionId are required" });
    }

    // Create a new SellerSolutionPackage
    const newPackage = new SellerSolutionPackage({
      name,
      industryId,
      solutionId,
      link,
      companyName,
      description,
    });

    // Save the package to the database
    await newPackage.save();

    // Return the created package
    res.status(201).json({
      message: "solution package approval request has been sent to admin",
      data: newPackage,
    });
  } catch (error) {
    console.error("Error creating SellerSolutionPackage:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getSellerSolutionPackage = async (req, res) => {
  try {
    const packages = await SellerSolutionPackage.find({
      isApproved: false,
      isRejected: false,
    });

    res.status(200).json({
      message: "SellerSolutionPackages fetched successfully",
      data: packages,
    });
  } catch (error) {
    console.error("Error fetching SellerSolutionPackages:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const getSellerSolutionPackageById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the required field
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    // Find the SellerSolutionPackage by ID
    const package = await SellerSolutionPackage.findById(id);

    if (!package) {
      return res
        .status(404)
        .json({ message: "SellerSolutionPackage not found" });
    }

    res.status(200).json({
      message: "SellerSolutionPackage fetched successfully",
      data: package,
    });
  } catch (error) {
    console.error("Error fetching SellerSolutionPackage by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const approveRequest = async (req, res) => {
  try {
    console.log("request body is here from approve", req.body);
    const { id, name, industryId, solutionId, isApproved, isRejected } =
      req.body;

    // Validate required fields
    if (
      !id ||
      !name ||
      !industryId ||
      !solutionId ||
      (isApproved === undefined && isRejected === undefined)
    ) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    // Check if the request is to approve or reject
    let updateFields = {};
    if (isApproved === "true") {
      updateFields.isApproved = true;
    } else if (isRejected === "true") {
      updateFields.isRejected = true;
    } else {
      return res
        .status(400)
        .json({ message: "Either isApproved or isRejected must be true" });
    }

    // Update the SellerSolutionPackage
    const updatedPackage = await SellerSolutionPackage.findOneAndUpdate(
      { _id: id },
      updateFields,
      { new: true }
    );

    if (!updatedPackage) {
      return res
        .status(404)
        .json({ message: "SellerSolutionPackage not found" });
    }
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (isApproved === "true") {
      if (!image) {
        return res.status(400).json({ message: "Image file is required" });
      }
      // Find the Industry and update the corresponding solution package
      const industry = await Industry.findById(industryId);
      if (!industry) {
        return res.status(404).json({ message: "Industry not found" });
      }

      const solution = industry.solutions.id(solutionId);
      if (!solution) {
        return res.status(404).json({ message: "Solution not found" });
      }

      // Add the approved package to the solution package array
      solution.solutionPackage.push({
        name: updatedPackage.name,
        image,
        link: updatedPackage.link,
        companyName: updatedPackage.companyName,
        description: updatedPackage.description,
        sellerProductId: id,
      });

      await industry.save();
    }

    res.status(200).json({
      message: `SellerSolutionPackage ${
        isApproved === "true" ? "approved" : "rejected"
      } successfully`,
      data: updatedPackage,
    });
  } catch (error) {
    console.error("Error processing SellerSolutionPackage:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateSellerSolutionPackageName = async (req, res) => {
  try {
    const { id, name } = req.body;

    // Validate the required fields
    if (!id || !name) {
      return res.status(400).json({ message: "ID and name are required" });
    }

    // Find the package and update the name
    const updatedPackage = await SellerSolutionPackage.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!updatedPackage) {
      return res
        .status(404)
        .json({ message: "SellerSolutionPackage not found" });
    }

    res.status(200).json({
      message: "SellerSolutionPackage name updated successfully",
      data: updatedPackage,
    });
  } catch (error) {
    console.error("Error updating SellerSolutionPackage name:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createSellerSolutionPackage,
  getSellerSolutionPackage,
  approveRequest,
  updateSellerSolutionPackageName,
  getSellerSolutionPackageById,
};
