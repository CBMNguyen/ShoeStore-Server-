const Color = require("../model/color");

module.exports = {
  // handle get all Color
  color_getAll: async (req, res) => {
    try {
      const colors = await Color.find();
      res.status(200).json({ colors });
    } catch (error) {
      res.status(500).json({ error });
    }
  }, // handle create Color
  color_create: async (req, res) => {
    const { color } = req.body;
    try {
      const newColor = new Color({ color });
      await newColor.save();
      res.status(201).json({ message: "Color created" });
    } catch (error) {
      res.status(500).json({ error });
    }
  }, // handle delete Color
  color_delete: async (req, res) => {
    const { colorId } = req.params;
    try {
      await Color.deleteOne({ _id: colorId });
      res.status(200).json({ message: "Color created" });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};