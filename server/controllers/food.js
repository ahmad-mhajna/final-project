const Food = require("../models/food");

const getAllFoods =
  ("/products",
  async (req, res) => {
    const product = await Food.find({});
    try {
      res.send(product);
    } catch (e) {
      res.status(500).send(e);
    }
  });
const newFood = async (req, res) => {
  const product = new Food(req.body);

  try {
    await product.save();
    res.status(201).send({ product });
  } catch (e) {
    res.status(400).send(e);
  }
};
const editFood = async (req, res) => {
  try {
    const updates = ["price", "img", "categories", "name"];
    const food = await Food.findById(req.params.id);
    updates.forEach((update) => {
      food[update] = req.body[update];
    });
    await food.save();
    res.send(food);
  } catch (e) {
    res.status(400).send(e);
  }
};
const deletefood = async (req, res) => {
  const id = req.params.id;
  try {
    await Food.findByIdAndDelete(id);
    const food = await Food.find({});
    res.send(food);
  } catch (e) {
    res.status(500).send(e);
  }
};
module.exports = {
  newFood,
  editFood,
  deletefood,
  getAllFoods,
};
