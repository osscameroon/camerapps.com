import express from "express";
import exphbs from "express-handlebars";
import * as helpers from "./helpers/handlebars";
import {handleHome, handleSearch} from "./handlers";


enum E_ENVIRONMENT {
  dev = "dev",
  stage = "stage",
  prod = "production",
}

const port: number = 3001;
const app = express();

//Set view path
app.set("views", __dirname + "/views");
app.engine(
  ".hbs",
  exphbs({
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: __dirname + "/views/layouts/",
    partialsDir: __dirname + "/views/partials/",
    helpers: helpers,
  })
);
app.set("view engine", ".hbs");

app.get("/", handleHome);
app.get("/q", handleSearch);

app.use("/views", express.static(__dirname + "/views"));
app.use("/res", express.static(__dirname + "/res"));
app.use('/scripts', express.static(__dirname + '/views/scripts'));
app.listen(port, () => {
  console.log(`The application is listening on port ${port}`);
});
