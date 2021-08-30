import YAML from "yaml";
import { extractHandleFromGitHubUrl } from "./helpers/github";
import * as fs from "fs";

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
