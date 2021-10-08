import YAML from "yaml";
import { extractHandleFromGitHubUrl } from "./helpers/github";
import * as fs from "fs";
import Fuse from "fuse.js";

const appsFilePath = __dirname + "/res/apps.yaml";

export interface Item {
  title?: string;
  category?: string;
  tags?: string[];
  description?: string;
  website?: string;
  url?: string;

  //twitter handle
  twitter?: string;

  dikalo?: string;
  telegram?: string;
  facebook?: string;
  whatsapp?: string;
  playstore?: string;
  appstore?: string;
  slack?: string

  //github_account handle is used to display an image if the image is not specified
  github_account?: string;
  github_handle?: string;

  otherlinks?: string[];
  image?: string;
};

export interface Apps {
  items?: Item[];
};

const formatItems = (apps: Apps): Item[] | undefined => {
  let items = apps?.items?.map((i: Item): Item => ({
    ...i,
    image: i.image && (i.image.indexOf("http://") === 0 || i.image.indexOf("https://") === 0) ? i.image : "/res/imgs/" + i.image,
    github_handle: extractHandleFromGitHubUrl(i.github_account ?? ""),
    url: i.website ?? i.dikalo ?? i.twitter ?? i.facebook ?? i.github_account ?? i.slack ?? i.telegram ?? i.whatsapp ?? i.playstore ?? i.appstore
  }));
  return items
}

export const getApps = (): Apps => {
  try {
    const file = fs.readFileSync(appsFilePath, "utf8");
    const apps = YAML.parse(file);
    return {
      items: formatItems(apps),
    };
  } catch (err) {
    //replace this with a proper log
    //and proper http error handling
    console.error("Failed to parse file:", err);
  }

  return {};
};

export const getItemsMatchingQuery = (
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