 // Version: 1.2.1

var meta = {
   name: "@cmd/core",
   ver: "1.2.1",
   deps: []
}

function load() {
   let { create } = cmd;
   let { echo, help, clear, helpinfo } = core.action;
   let { request } = core
   
   vars.set("version", "1.2.1")
   
   create({
      tag: "help",
      help: "%tag%",
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
      help: "%tag% [message]",
      category: "Core",
      run: args => { echo(args.join(" ") || args) }
   });
   
   create({
      tag: "clear",
      help: "%tag%",
      category: "Core",
      aliases: ["cls"],
      run: clear
   });
   
   create({
      tag: "mod",
      help: "%tag% [add|list|deps] [module]",
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
      help: "%tag% [key] [value]",
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
      help: "%tag%",
      category: "Core",
      run: (args) => {
         action.echo(`\n${utils.color("[ UUID Generator ]", "lightgray")}
         ${crypto.randomUUID()}`);
      }
   })
   
   create({
      tag: "base64",
      help: "%tag% [text]",
      category: "Core",
      run: (args) => {
         if(!args[0]) {
            echo(helpinfo("base64"))
         } else {
         action.echo(`\n${utils.color("[ Base64 Converter ]", "lightgray")}
         ${btoa(args[0])}`);
         }
      }
   })
   
   cmd.create({
    tag: "rand",
    aliases: ["ran"],
    help: "%tag% [min] [max]",
    category: "Core",
    run: (args) => {
      if (!args[0] || !args[1] || args[0] >= args[1]) {
        action.echo(utils.color("Min needs to be less then Max", "orange"))
        
        return;
      }
      
      const [min, max] = args;
      
      action.echo(`\n%bar%
      ${utils.color("[ Rand Number ]", "lightgray")}
      Here's a number between ${min} and ${max}: ${utils.color(utils.randNumber(Number(min), Number(max)), "lightgray")}
      %bar%`)
    }
  })
  
     create({
     tag: "curl",
     help: "%tag% [url]",
     category: "Core",
     run: (args) => {
       if(!args[0]) {
         echo(helpinfo("curl"))
       } else {
         request.send(args[0], false, (resp) => {
           echo(resp)
         })
       }
     }
   })
   
   create({
     tag: "ipaddress",
     aliases: ["ip"],    
     help: "%tag%",
     category: "Core",
     run: (args) => {
         request.send("https://api.ipify.org", false, (resp) => {
           echo(`${utils.color("[ IP Address ]", "lightgray")}
           ${resp}`)
         })
     }
   })
}

function unload() {}