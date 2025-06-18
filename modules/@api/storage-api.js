// Version: 1

var meta = {
  name: "@api/storage-api",
  ver: "1",
   deps: []
}

function load() {
  let ls = localStorage;
  let local = JSON.parse(ls.getItem("userdata")) || {}
  
  let t = 0;
  for (var x in localStorage) { t += (((localStorage[x].length * 2))); }
  vars.set("storage_used", t / 1024 + " KB");
  vars.set("storage_used_raw", t / 1024);
  
  action.storage = {
    set: (key, value) => {
      vars.get("debug") >= 1 ? action.echo(`${utils.color(`[Storage]`, color)} ${key} set to ${value}`, "green") : "";
      
      local[key] = value || null;
      localStorage.setItem("userdata", JSON.stringify(local));
    },
    get: (key) => {
      return local[key] || null;
    }
  }
  
}