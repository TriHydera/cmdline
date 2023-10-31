function load() {
   let { create } = cmd;
   let { echo, help, clear } = action;

   vars.set("version", "1.0")

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
      help: "mod [add|remove|list] [module]",
      category: "Core",
      aliases: [],
      run: args => {
        vars.set("not_avilable", "This feature is not avilable yet!")

         switch (args[0]) {
            case "add":
               module.add(args[1], status => {
               if(status){
                  action.echo(`Module: ${args[1]} was imported`, { color: "orange" })
               }
               });
               break;

            case "remove":
               echo(`%bar%
         Remove: %not_avilable%
         %bar%`, { color: "orange" });
               break;

            case "list":
            default:
               echo("\n[ Imported Modules ]\n", { color: "blue" });
               $.each(data.modules, e => {
                  echo(`- ${utils.color(data.modules[e], "yellow")}`);
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
         if(args[0] && args[1]){
            vars.set(args[0], args[1]);
            action.echo(`Variable: "${args[0]}" set to "${args[1]}"`, { color: "orange" });
         } else {
           action.echo(Object.keys(data.vars).join(", "));
         }
      }
   });

   create({
      tag: "help",
      help: "help",
      category: "Core",
      aliases: ["?"],
      run: help
   });
}

function unload() { }