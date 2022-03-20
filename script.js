const express = require("express");

const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Todo = require("./models/todo");
let port = process.env.PORT || 3000;

console.log(Todo);

mongoose.connect("mongodb://localhost:27017/todo-app");

app.use("/", express.static(path.resolve(__dirname, "assets")));

app.use(bodyParser.json());

//delete

app.post("/api/delete", async (req, res) => {
  const { record: value } = req.body;
  //   console.log(record);
  const deletedResponse = await Todo.deleteOne({ record: value });
  console.log(deletedResponse);
});

//update
app.post("/api/modify", async (req, res) => {
  const { old: oldValue, new: newValue } = req.body;
  const updatedRes = await Todo.findOneAndUpdate(
    { record: oldValue },
    {
      $set: {
        record: newValue,
      },
    },

    { new: true }
  );
  console.log("UPDATED", updatedRes);
});

//read
app.get("/api/get", async (req, res) => {
  const records = await Todo.find({});
  //   console.log("response", records);
  res.json(records);
});

app.post("/api/create", async (req, res) => {
  const record = req.body;
  console.log(record);
  //Create
  const response = await Todo.create(record);
  //response is from MongoDB database server
  console.log(response);
  res.json({ status: "ok" });
});

app.listen(port, () => {
  console.log("server started....");
});
