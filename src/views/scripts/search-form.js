// search-form.js
// this js file will contains all requirements

const searchApps = (event, type="query") => {
    // we get all params...
    const query = document.getElementById("query").value;
    const category = document.getElementById("category").value;
    const tag = document.getElementById("tag").value;

    // we make the query
    fetch(`/q?query=${query}&category=${category}&tag=${tag}`)
    .then(res => res.json())
    .then(out => {
        document.getElementById("app-list").innerHTML = buildAppList(out.apps);
    }).catch(err => console.log(`[x] ${err}`));
}
