  import './css/style.css'
  // import './less/style.less'
  let child = document.createElement("div");
  child.textContent = "Hi From index.js";
  document.querySelector("#app").appendChild(child);