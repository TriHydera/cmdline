function load() {
  module.add("@cmd/request");
  
   let {
      color
   } = utils;
   let {
      echo
   } = action;
   let {
      create
   } = cmd;

   let config = {
      animals: ["bird", "cat", "dog", "fox", "koala", "panda"],
      base: "https://some-random-api.ml"
   }
   config.facts = `${config.base}/facts`

   config.help = `\n${color("[ Fact Help ]", "blue")}\n ${color("Values for [animal]:", "lightblue")}\n- ${config.animals.join("\n- ")}`;

   create({
      "tag": "fact",
      "help": "fact [animal]",
      "category": "SRAPI",
      run: (args) => {

         if (!config.animals.includes(args[0])) {
            echo(config.help);
         } else {
            action.request(`${config.facts}/${args[0]}`,
               (data) => {
                  echo(`${color(`\n[ Fact about ${args[0]}s ]`, "blue")}\n${color(data.fact, "lightblue")}`);
               }
            );
         }
      }
   });
}

function unload() {
   cmd.remove("fact")
}