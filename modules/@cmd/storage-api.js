function load() {
  let ls = localStorage;
  let local = JSON.parse(ls.getItem("userdata")) || {}
  
  let t = 0;for(var x in localStorage){ t += (((localStorage[x].length * 2))); } 
  vars.set("storage_used", t/1024+ " KB");
  vars.set("storage_used_raw", t/1024);
  
  action.storage = {
    setValue: (key, value) => {
        local[key] = value || null;
        ls.setItem("userdata", JSON.stringify(local));
      },
      getValue: (key) => {
        return local[key] || null;
      }
  }
  
}