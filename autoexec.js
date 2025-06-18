   let { color } = utils
   
   vars.set("debug", 0);
   
   module.add("@cmd/core", () => {
     
     vars.set("bar", "===================================");
     
     action.echo(`%bar%
| Welcome to ${color("command line", "lightblue")}!
| Type ${color("\"help\"", "lightblue")} to get a
| list of commands
| Version: ${color("%version%", "lightblue")}
%bar%`);
    
     module.add("@cmd");
     module.add("srapi");
     module.add("@games/spin");
   })