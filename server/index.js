require("dotenv").config();
const express = require("express");

const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(cors());
/*
When strict option is set to true, Mongoose will ensure that only the fields that are specified in your Schema will be saved in the database, and all other fields will not be saved (if some other fields are sent).

Right now, this option is enabled by default, but it will be changed in Mongoose v7 to false by default. That means that all the fields will be saved in the database, even if some of them are not specified in the Schema model.
*/
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

app.use(express.json());

const subscribersRouter = require("./routes/subscribers");
app.use("/subscribers", subscribersRouter);

app.listen(3001, () => {
  console.log("Server on port 3001");
});
