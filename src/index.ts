import express from "express";
import exphbs from "express-handlebars";
import * as helpers from "./helpers/handlebars";
import {getApps} from "./apps";

enum E_ENVIRONMENT {
  dev = "dev",
  stage = "stage",
  prod = "production",
}

const port: number = 3001;
const app = express();

const getCurrentYear = () => {
  const d = new Date();
  return d.getFullYear();
}

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

const handleHome = async (req: any, res: any) => {
  const query = req.query.query || "";
  const apps = getApps()?.items;
  res.render("index", {
    link: "home",
    query,
    apps,
    currentYear: getCurrentYear(),
  });
};

app.get("/", handleHome);

app.use('/views', express.static(__dirname + "/views"))
app.use('/res', express.static(__dirname + "/res"))
app.listen(port, () => {
  console.log(`The application is listening on port ${port}`);
});
