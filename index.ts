import express from "express";
import path from "path";
import restaurant from "./models/restaurant";
import menus from "./models/menus";
import { engine } from "express-handlebars";

const app = express();

app.engine(
  "handlebars",
  engine({
    defaultLayout: path.join(__dirname, "views", "layouts", "main.handlebars"),
    extname: ".handlebars",
  }),
);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.get("/ping", (req, res) => {
  res.sendStatus(200);
});

app.get("/", (req, res) => {
  res.render("home", {
    restaurant,
  });
});

app.get("/menus", (req, res) => {
  res.render("menu", {
    menus,
    restaurant,
  });
});

app.use("/assets", express.static(path.join(__dirname, "assets")));

app.listen(3000);
