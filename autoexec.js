(() => {
   let { color } = utils
   
   core.vars.set("debug", 0);
   core.storage.updateStats();
   
   core.module.add("@cmd/core", () => {
     core.vars.set("bar", "===================================");
     
     core.action.echo(`%bar%
| Welcome to ${color("command line", "lightblue")}!
| Type ${color("\"help\"", "lightblue")} to get a
| list of commands
| Version: ${color("%version%", "lightblue")}
%bar%`);
    
    ["@api/currency-api", "@cmd/printer", "srapi", "@games/spin"].forEach(item => core.module.add(item))
   })
})()