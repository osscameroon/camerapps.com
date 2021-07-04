import express from "express";
import exphbs from "express-handlebars";
import * as helpers from "./helpers/handlebars";
import { getApps, Item } from "./apps";
import Fuse from "fuse.js";

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
};

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

const getItemsMatchingQuery = (
  query: string,
  category: string,
  tag: string,
  items: any
): Item[] => {
  let list = items;

  if (query !== "") {
    const f: Fuse<Item> = new Fuse(items, {
      distance: 100,
      threshold: 0.3,
      keys: ["description", "title", "tags", "category"],
    });
    list = f.search(query)?.map((e: Fuse.FuseResult<Item>): Item => {
      return e.item;
    });
  }

  const filteredByCategory = list.reduce((acc: any, val: any) => {
    if (
      category === "any" ||
      val.category === category
    ) {
      return acc.concat(val);
    }
    return acc;
  }, []);

  const filteredByTags = filteredByCategory.reduce((acc: any, val: any) => {
    if (
      val.tags.find((t: any) =>  (tag === "any" || t === tag))
    ) {
      return acc.concat(val);
    }
    return acc;
  }, []);

  return filteredByTags;
};

const handleHome = async (req: any, res: any) => {
  const query = req.query.query || "";
  const selectedCategory = req.query.category || "any";
  const selectedTag = req.query.tag || "any";
  const apps = getApps()?.items;
  const filteredApps = getItemsMatchingQuery(
    query,
    selectedCategory,
    selectedTag,
    apps
  );
  const categories = new Set(apps?.map((a) => a.category)).add("any");
  const tags = new Set(
    apps?.reduce((acc: any, val: any): any => acc.concat(val.tags), [])
  ).add("any");

  res.render("index", {
    link: "home",
    query,
    apps: filteredApps,
    categories: { list: categories, selected: selectedCategory },
    tags: { list: tags, selected: selectedTag },
    currentYear: getCurrentYear(),
  });
};

app.get("/", handleHome);

app.use("/views", express.static(__dirname + "/views"));
app.use("/res", express.static(__dirname + "/res"));
app.listen(port, () => {
  console.log(`The application is listening on port ${port}`);
});
