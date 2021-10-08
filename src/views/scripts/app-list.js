// app-list.js
// in this file we could add functions/utils 
// related to the app listing like pagination or other stuff...

// We load all our apps in this module
fetch(`/q?query=&category=&tag=`)
.then(res => res.json())
.then(out => {
    document.getElementById("app-list").innerHTML = buildAppList(out.apps);
}).catch(err => console.log(`[x] ${err}`));
