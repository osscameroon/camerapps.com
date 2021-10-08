import { getApps, getItemsMatchingQuery } from "../apps";

/**
 * This method will parse and retrieve all necessary parameters we need
 * @param req 
 * @returns 
 */
 export const parseParams = (req: any) => {
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
  
    return {
      query,
      apps: filteredApps,
      categories: { list: categories, selected: selectedCategory },
      tags: { list: tags, selected: selectedTag },
    }
}