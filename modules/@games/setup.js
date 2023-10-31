function load() {
   cmd.create({
      tag: "games-setup",
      help: "%tag%",
      category: "Setup",
      run: () => {
         let { add, remove } = module;

         add("@games/spin");
         remove("@games/setup");
      }
   });
}