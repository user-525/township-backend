const Solution = require("../models/SolutionSchema");
const Industry = require("../models/IndustrySchema");
const upload = require("../middleware/upload");

const addSolution = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    } else {
      const { industryId, name } = req.body;
      const image = req.file ? `/uploads/${req.file.filename}` : null;
      const newSolutionData = { name, image };
      console.log("=========newSolutionData==============", newSolutionData);
      try {
        const data = await Industry.updateOne(
          { _id: industryId },
          { $push: { solutions: newSolutionData } }
        );
        console.log("data after upload", data);
        res.status(200).json({
          success: true,
          data: "added successfully",
        });
      } catch (error) {
        console.error("Error adding solution", error);
        res.status(500).json({
          success: false,
          error: "Internal Server Error",
        });
      }
    }
  });
};

module.exports = { addSolution };
