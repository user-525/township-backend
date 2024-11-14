const Industries = require("../models/IndustrySchema");
const upload = require("../middleware/upload");

const addIndustry = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    } else {
      const { name } = req.body;
      console.log("=====request file======", req.file);
      const image = req.file ? `/uploads/${req.file.filename}` : null;
      console.log("image from frontend", image);
      try {
        const industry = new Industries({ name, image });
        await industry.save();
        res.status(200).json({
          success: true,
          data: industry,
        });
        console.log("Industry added successfully");
      } catch (error) {
        console.error("Error adding industry", error);
        res.status(500).json({
          success: false,
          error: "Internal Server Error",
        });
      }
    }
  });
};

const getIndustries = async (req, res) => {
  try {
    const industries = await Industries.find();
    res.status(200).json({
      success: true,
      data: industries,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

const getIndustryById = async (req, res) => {
  const { id } = req.params;
  try {
    const industry = await Industries.findById(id);
    if (!industry) {
      return res.status(404).json({
        success: false,
        error: "Industry not found",
      });
    }
    res.status(200).json({
      success: true,
      data: industry,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

const deleteIndustry = async (req, res) => {
  const { id } = req.params;
  console.log("id from delete", id);
  try {
    const industry = await Industries.findByIdAndDelete(id);
    if (!industry) {
      return res.status(404).json({
        success: false,
        error: "Industry not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Industry deleted successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

module.exports = {
  addIndustry,
  getIndustries,
  getIndustryById,
  deleteIndustry,
};
