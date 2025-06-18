// Version: 2

var meta = {
   name: "@cmd/core",
   ver: "2",
   deps: []
}


function load() {
   let { create } = cmd;
   let { echo, help, clear } = action;
   
   vars.set("version", "1.1")
   
   create({
      tag: "help",
      help: "help",
      category: "Core",
      aliases: ["?"],
      run: () => {
         action.echo("\n[ Avilable Commands ]\n", { color: "lightgrey" });
         $.each(data.cmds, cmd => {
            cmd = data.cmds[cmd];
            if (!cmd.hidden) {
               action.echo(`${utils.color(cmd.tag, "pink")} | ${utils.color(cmd.help.replace("%tag%", cmd.tag), "green")} | ${utils.color(cmd.category, "lightblue")}`);
            }
         })
      }
   });
   
   create({
      tag: "echo",
      help: "echo [message]",
      category: "Core",
      run: args => { echo(args.join(" ") || args) }
   });
   
   create({
      tag: "clear",
      help: "clear",
      category: "Core",
      aliases: ["cls"],
      run: clear
   });
   
   create({
      tag: "mod",
      help: "mod [add|list|deps] [module]",
      category: "Core",
      aliases: [],
      run: args => {
         vars.set("not_avilable", "This feature is not avilable yet!")
         
         switch (args[0]) {
            case "add":
               module.add(args[1], (status, moduleName) => {
                  if (status) {
                     action.echo(`Module: ${moduleName} was imported`, { color: "orange" })
                  }
               });
               break;
               
               
            case "deps":
               action.echo(`\n[ Deps for ${args[1]} ]\n`, { color: "lightgrey" });
               module.listDeps(args[1]).forEach(moduleName => {
                  echo(`- ${utils.color(moduleName, "yellow")}`);
               });
               break;
               
            case "remove":
               echo(`%bar%
         Remove: %not_avilable%
         %bar%`, { color: "orange" });
               break;
               
            case "list":
            default:
               echo("\n[ Imported Modules ]\n", { color: "lightgrey" });
               module.list().forEach(moduleName => {
                  echo(`- ${utils.color(moduleName, "yellow")}`);
               });
               break;
         }
      }
   });
   
   create({
      tag: "set",
      help: "set [key] [value]",
      category: "Core",
      run: args => {
         if (args[0] && args[1]) {
            vars.set(args[0], args[1]);
            action.echo(`Variable: "${args[0]}" set to "${args[1]}"`, { color: "orange" });
         } else {
            action.echo(Object.keys(data.vars).join(", "));
         }
      }
   });
   
   create({
      tag: "uuid",
      help: "uuid",
      category: "Core",
      run: (args) => {
         action.echo(`\n${utils.color("[ UUID Generator ]", "lightgray")}
         ${crypto.randomUUID()}`);
      }
   })
}

function unload() {}