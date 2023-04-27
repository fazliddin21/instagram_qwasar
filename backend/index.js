const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const { mongoUrl } = require("./keys");
const cors = require("cors");
const path = require("path")

app.use(cors());
app.options("*", cors());
app.use(express.json());

app.use(require("./routes/auth"));
app.use(require("./routes/createpost"));
app.use(require("./routes/user"));

// server front
// app.use(express.static(path.join(__dirname, "..", "frontend", "build")))

// app.get("*", (req,res) => {
//   res.sendFile(
//     path.join (__dirname, "..", "frontend", "build", "index.html"),
//     function (err) {
//       res.status(500).send(err)
//     }
//   )
// })

app.listen(port, async () => {
  await mongoose.connect("mongodb+srv://fazliddin-insta:7jzDsSxzinoekc6v@cluster0.wc0hfa2.mongodb.net/?retryWrites=true&w=majority");
  mongoose.connection.on("connected", () => {
    console.log("successfully connected to mongo");
  });
  mongoose.connection.on("error", () => {
    console.log("not connected yo mongodb");
  });
  console.log("server is running on port" + " " + port);
});
