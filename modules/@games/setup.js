// Version: 1

var meta = {
   name: "@games/setup",
   ver: "1",
   deps: ["@games/spin"]
}

function load() {
   cmd.create({
      tag: "games-setup",
      help: "%tag%",
      category: "Setup",
      run: () => {
         let { add, remove } = module;
         
         add("@games/spin", () => {
            remove("@games/setup");
         });
      }
   });
}