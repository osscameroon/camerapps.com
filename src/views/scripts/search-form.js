// search-form.js
// this js file will contains all requirements

const searchApps = (givenUrl='') => {
    // we get all params...
    const query = document.getElementById("query").value;
    const category = document.getElementById("category").value;
    const tag = document.getElementById("tag").value;

    const page = givenUrl !== '' && givenUrl.split('page=')[1] !== '' ? `&page=${givenUrl.split('page=')[1]}`: ``;

    const finalUrl = `/q?query=${query}&category=${category}&tag=${tag}${page}`;

    // we make the query
    fetch(finalUrl)
    .then(res => res.json())
    .then(out => {
        document.getElementById("app-list").innerHTML = buildAppList(out.apps);
        document.getElementById("paginate").innerHTML = buildPagination(out);
        
        document.querySelectorAll(".page-link").forEach(elem => {
            elem.addEventListener("click", event => {
                searchApps(event.target.getAttribute('href'));
            });
        });
    }).catch(err => console.log(`[x] ${err}`));
}

searchApps();
