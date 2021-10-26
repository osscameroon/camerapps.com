// app-list.js
// in this file we could add functions/utils 
// related to the app listing like pagination or other stuff...


/**
 * This function will display links depending on linksObject given
 * @param {*} linksObject 
 * @returns 
 */
 const displayLinks = (linksObject) => {
    let htmlLinks = "";
    for (key in linksObject){
        htmlLinks += (
            linksObject[key] !== undefined ? 
                `<a class="col" href="${linksObject[key]}" target="_blank">
                    <i class="fa fa-${key} fa-lg" aria-hidden="true"></i>
                </a>`: ``
        )
    }
    return htmlLinks;
}

/**
 * This function will build the html of the list of applications
 * given as parameter
 * 
 * @param {*} apps 
 * @returns 
 */
const buildAppList = (apps) => {
    let htmlAppList = "";
    apps.map(app => {
        htmlAppList += `
            <div class="col-md-4 d-flex justify-content-center">
                <div class="card h-100 w-100">
            
                    <div class="card-body">
                        <div class="d-flex justify-content-start align-items-center mb-2">
                        <img style="height: 50px; width: 50px" class="rounded" src="${app.image}" class="card-img-top" alt="image">
                        <div class="ms-2 pt-3">
                            <a style="text-decoration: underline; color: black" href="${app.url}" target="_blank">
                                <h6 class="card-title"><strong>${app.title}</strong></h6>
                            </a>
                            <p style="font-size: 0.8rem"><em>${app.category}</em></p>
                            </div>
                        </div>
                        <p style="max-height: 150px; white-space: wrap; overflow: hidden;" class="card-text">${app.description}</p>
                    </div>
            
                    <div class="row g-1 card-footer row-cols-auto d-flex align-items-center">
                        ${
                            displayLinks({
                                "globe": app.website,
                                "telegram": app.telegram,
                                "whatsapp": app.whatsapp,
                                "github-square": app.github_account,
                                "twitter-square": app.twitter,
                                "facebook-square": app.facebook,
                                "apple": app.appstore,
                                "android": app.playstore,
                                "slack": app.slack,
                            })
                        }        
                    </div>
                </div>
            </div>
        `;
    })
    return htmlAppList;
}
