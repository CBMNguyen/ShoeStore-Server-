const Color = require("../model/color");

module.exports = {
  // handle get all Color
  color_getAll: async (req, res) => {
    try {
      const colors = await Color.find();
      res.status(200).json({ message: "Fetch color successfully.", colors });
    } catch (error) {
      res.status(500).json({ error });
    }
  }, 

  // handle create Color
  color_create: async (req, res) => {
    const { color } = req.body;
    try {
      const isCurrentColor = await Color.findOne({color});
      if(isCurrentColor) return res.status(409).json({message: "Color already exist."});

      const newColor = new Color({ color });
      await newColor.save();
      res.status(201).json({ message: "Added a new color.", newColor });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
  
  // handle update color
  color_update: async (req, res) => {
    const { colorId } = req.params;
    try {
      const {color} = await Color.findById({_id: colorId});
      const isCurrentColor = await Color.findOne({color: req.body.color});

      if(color === req.body.color || !isCurrentColor){
        const colorUpdated = await Color.updateOne(
          { _id: colorId },
          {
            $set: {
              ...req.body,
            },
          }
        );
        res.status(200).json({ message: "Color updated.", colorUpdated });
      }else{
        res.status(409).json({message: "Color already exists."});
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  }, // handle delete Color
  color_delete: async (req, res) => {
    const { colorId } = req.params;
    try {
      await Color.deleteOne({ _id: colorId });
      res.status(200).json({ message: "Color deleted." });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};
