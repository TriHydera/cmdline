setObjectValue(data, "request", {});
function load(){
  action.request = (url, callback) => {
    let domain = (new URL(url)).hostname;
    if(data.request[domain] == "allow"){
      $.getJSON(url, callback);
    } else {
      action.prompt(`Allow access to "${domain}"? (y/yes/n/no)`, input => {
        switch (input) {
          case "y" || "yes":
            setObjectValue(data.request, domain, "allow");
            $.getJSON(url, callback);
            break;
        
          default:
            break;
        }
      });
    }
  }
}
