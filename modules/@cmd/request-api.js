// Version: 1 
 
 function load(){
  action.request = (url, callback) => {
    const hosts = action.storage.get("allowedHosts") || ["localhost", "127.0.0.1"];
    let domain = (new URL(url)).hostname;
    
    if(hosts.indexOf(domain) > 0){
      $.getJSON(url, callback);
    } else {
      action.prompt(`Allow access to "${domain}"? (y/yes/n/no)`, input => {
        switch (input) {
          case "y" || "yes":
            hosts.push(domain);
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
