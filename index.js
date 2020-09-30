const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const exphbs = require("express-handlebars");
const dotenv = require("dotenv");
dotenv.config();

const todoRoutes = require("./routes/todos");

const PORT = process.env.PORT || 3000;

const app = express();
const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(todoRoutes);

async function start() {
  try {
    await mongoose.connect(process.env.DB_CONNECT_STRING, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () =>
      console.log(`Server has benn started on prot ${PORT}...`)
    );
  } catch (error) {
    console.log(error);
  }
}

start();
