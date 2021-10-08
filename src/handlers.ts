import {parseParams} from "./helpers/request";
import  {getCurrentYear} from "./helpers/common";

/**
 * We handle the search here with incomming datas
 * @param req 
 * @param res 
 */
export const handleSearch = async (req: any, res: any) => {
    res.json(parseParams(req));
}

/**
 * We handle the home here
 * @param req 
 * @param res 
 */
export const handleHome = async (req: any, res: any) => {
    res.render("index", {
        link: "home",
        currentYear: getCurrentYear(),
    });
};