import { getApps, getItemsMatchingQuery, paginateApps } from "../apps";

/**
 * This method will parse and retrieve all necessary parameters we need
 * @param req 
 * @returns 
 */
 export const parseParams = (req: any, limit: number=6) => {
  const query = req.query.query || "";
  const selectedCategory = req.query.category || "any";
  const selectedTag = req.query.tag || "any";
  const apps = getApps()?.items;
  let filteredApps = getItemsMatchingQuery(
    query,
    selectedCategory,
    selectedTag,
    apps
  );
  const categories = new Set(apps?.map((a) => a.category)).add("any");
  const tags = new Set(
    apps?.reduce((acc: any, val: any): any => acc.concat(val.tags), [])
  ).add("any");

  const {
    count,
    items,
    interval
  } = paginateApps(filteredApps,parseInt(req.query.page) || 1);

  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

  return {
    query,
    interval,
    fullUrl,
    hasParams: fullUrl.includes('?'),
    current: parseInt(req.query.page) || 1,
    pages: Math.ceil(count/limit),
    apps: items,
    categories: { list: categories, selected: selectedCategory },
    tags: { list: tags, selected: selectedTag },
  }
}