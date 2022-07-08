const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
require("./db/mongoose");
const userRouter = require("./routers/user");
const foodRouter = require("./routers/food");

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(userRouter);
app.use(foodRouter);
app.listen(port, () => {
  console.log("Server is up on port " + port);
});
