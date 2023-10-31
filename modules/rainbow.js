function load() {
  module.add("@cmd/styler");

   let { create, run } = cmd;

   let color = 111111,
      loop;

   create({
      tag: "rainbow",
      help: "rainbow [on|off] [rate]",
      category: "Rainbow",
      aliases: ["rb"],
      run: args => {
         rate = args[1] ? args[1] : 5

         if (args[0] == "on") {
            loop = setInterval(() => {
               color += rate
               run("bg", [`#${color}`]);
            }, 500);
         } else if (args[0] == "off") {
            clearInterval(loop);
         }

      }
   });
}

function unload() {
   cmd.remove("rainbow");
}