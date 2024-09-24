import express from "express";
import path from "path";
import restaurant from "./models/restaurant";
import menus from "./models/menus";
import { engine } from "express-handlebars";

const app = express();

app.use(express.urlencoded({extended : false}));

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
    title : restaurant.name,
  });
});

app.get("/menus", (req, res) => {
  res.render("menu", {
    menus,
    title : "Menus - "+restaurant.name,
  });
});

app.get("/commander", (req, res)=>{
    const id = req.query.menu;
    const menu = menus.find(menu => menu.id === id);
    menu === undefined ? res.sendStatus(404) :
    res.render("commande", {
        menu,
        title : `Commander - ${restaurant.name}`,
    })
})

app.post('/commander', (req, res)=>{
    const {name, address, phone, id} = req.body;
    const person = {name, address, phone} ;
    const menu = menus.find(menu => menu.id === id);
    
    res.render("commande", {
        menu,
        title : `Commander - ${restaurant.name}`,
        person,
    })
})

app.use("/assets", express.static(path.join(__dirname, "assets")));

app.use('*', (req, res) => {
    res.render("erreur")
})

app.listen(3000);