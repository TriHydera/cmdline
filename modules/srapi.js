// Version: 2

function load() {
   const meta = {
      name: "srapi",
      ver: "2",
      deps: ["@api/request-api"]
   }
   
   module.add("@api/request-api");
   
   let { color } = utils;
   let { echo, request } = action;
   
   let config = {
      animals: ["bird", "cat", "dog", "fox", "koala", "panda"],
      base: "https://api.some-random-api.com"
   }
   config.facts = `${config.base}/facts`
   
   config.help = `\n${color("[ Fact Help ]", "lightgray")}\n ${color("Values for [animal]:", "lightblue")}\n- ${config.animals.join("\n- ")}`;
   
   cmd.create({
      "tag": "fact",
      "help": "fact [animal]",
      "category": "SRAPI",
      run: (args) => {
         
         if (!config.animals.includes(args[0])) {
            echo(config.help);
         } else {
            request(`${config.facts}/${args[0]}`,
               (data) => {
                  echo(`${color(`\n[ Fact about ${args[0]}s ]`, "lightgray")}\n${color(data.fact, "lightblue")}`);
               }
            );
         }
      }
   });
}

function unload() {
   cmd.remove("fact")
}