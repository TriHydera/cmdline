 function load(){
  action.request = (url, callback) => {
    const hosts = action.storage.get("allowedHosts") || ["localhost", "127.0.0.1"];
    
    let domain = (new URL(url)).hostname;
    if(hosts[domain] == "allow"){
      $.getJSON(url, callback);
    } else {
      action.prompt(`Allow access to "${domain}"? (y/yes/n/no)`, input => {
        switch (input) {
          case "y" || "yes":
            host[domain] = "allow";
            action.storage.set("allowedHosts", hosts)
            $.getJSON(url, callback);
            break;
        
          default:
            break;
        }
      });
    }
  }
}
