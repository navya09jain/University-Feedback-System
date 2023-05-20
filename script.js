const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
// const uri =
//   "mongodb+srv://navyajain030:HvMqiOrfBkdAIfC7@cluster0.qwfzymp.mongodb.net/FeedbackSystem";
// const dbName = "FeedbackSystem";
mongoose
  .connect(
    "mongodb+srv://" +
      process.env.userid +
      ":" +
      process.env.password +
      "@cluster0.qwfzymp.mongodb.net/FeedbackSystem",

    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch(err => {
    console.error("Error connecting to database:", err);
  });
// mongoose
//   .connect(`${uri}|${dbName}`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Connected to MongoDB Atlas");
//   })
//   .catch(err => {
//     console.error("Error connecting to database:", err);
//   });

//feedback schema
const feedback = new mongoose.Schema({
  name1: {
    type: String,
    required: true,
  },
  title1: {
    type: String,
    required: true,
  },
  description1: {
    type: String,
    required: true,
  },
});
const Feedback = mongoose.model("Feedback", feedback);
module.exports = Feedback;

//anonymous schema
const anonymous = new mongoose.Schema({
  title2: {
    type: String,
    required: true,
  },
  description2: {
    type: String,
    required: true,
  },
});
const Anonymous = mongoose.model("Anonymous", anonymous);
module.exports = Anonymous;

//suggestion schema
const suggestion = new mongoose.Schema({
  name3: {
    type: String,
    required: true,
  },
  title3: {
    type: String,
    required: true,
  },
  description3: {
    type: String,
    required: true,
  },
});
const Suggestion = mongoose.model("Suggestion", suggestion);
module.exports = Suggestion;

app.get("/mainpage", function (req, res) {
  res.sendFile(__dirname + "/mainpage.html");
});
app.get("/login", function (req, res) {
  res.sendFile(__dirname + "/login.html");
});
app.get("/feedback", function (req, res) {
  res.sendFile(__dirname + "/feedback.html");
});
app.get("/suggestion", function (req, res) {
  res.sendFile(__dirname + "/suggestion.html");
});
app.get("/anonymous", function (req, res) {
  res.sendFile(__dirname + "/anonymous.html");
});

app.post("/feedback", function (req, res) {
  let newFeedback = new Feedback({
    name1: req.body.name1,
    title1: req.body.title1,
    description1: req.body.description1,
  });
  newFeedback.save();
  res.redirect("/feedback");
});

app.post("/anonymous", function (req, res) {
  let newAnonymous = new Anonymous({
    title2: req.body.title2,
    description2: req.body.description2,
  });
  newAnonymous.save();
  res.redirect("/anonymous");
});

app.post("/suggestion", function (req, res) {
  let newSuggestion = new Suggestion({
    name3: req.body.name3,
    title3: req.body.title3,
    description3: req.body.description3,
  });
  newSuggestion.save();
  res.redirect("/suggestion");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function () {
  console.log("Server started");
});
