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
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "price", "categories", "img"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    updates.forEach((update) => (req.food[update] = req.body[update]));
    await req.food.save();
    res.send(req.food);
  } catch (e) {
    res.status(400).send(e);
  }
};
const deletefood = async (req, res) => {
  const id = req.body.id;
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
