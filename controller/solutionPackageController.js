const Industry = require("../models/IndustrySchema");
const upload = require("../middleware/upload");

const addSolutionPackage = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    } else {
      const { industryId, solutionId, name } = req.body;
      const image = req.file ? `/uploads/${req.file.filename}` : null;
      const newPackageData = { name, image };

      try {
        await Industry.updateOne(
          { _id: industryId, "solutions._id": solutionId },
          { $push: { "solutions.$.solutionPackage": newPackageData } }
        );
        res.status(200).json({
          success: true,
          data: "added successfully",
        });
      } catch (error) {
        console.error("Error adding solution package", error);
        res.status(500).json({
          success: false,
          error: "Internal Server Error",
        });
      }
    }
  });
};

const deleteSolutionPackage = async (req, res) => {
  const { industryId, solutionId, packageId } = req.body;
  console.log("delete solution package", industryId, solutionId, packageId);
  try {
    const industry = await Industry.updateOne(
      { _id: industryId, "solutions._id": solutionId },
      { $pull: { "solutions.$.solutionPackage": { _id: packageId } } }
    );

    if (industry.nModified === 0) {
      return res.status(404).json({
        success: false,
        error: "Solution package not found",
      });
    }

    res.status(200).json({
      success: true,
      data: "Deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting solution package", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

const getSolutionPackagesBySolutionId = async (req, res) => {
  const { industryId, solutionId } = req.params;
  try {
    const industry = await Industry.findById(industryId);
    if (!industry) {
      return res.status(404).json({
        success: false,
        error: "Industry not found",
      });
    }

    const solution = industry.solutions.id(solutionId);
    if (!solution) {
      return res.status(404).json({
        success: false,
        error: "Solution not found in this industry",
      });
    }

    res.status(200).json({
      success: true,
      data: solution.solutionPackage,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

module.exports = {
  addSolutionPackage,
  getSolutionPackagesBySolutionId,
  deleteSolutionPackage,
};
