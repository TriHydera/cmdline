function load() {
   let { rand } = utils;
   let { set } = vars;

   cmd.create({
      tag: "spin",
      help: "%tag%",
      category: "Games",
      run: () => {
         set("n1", rand(1, 9));
         set("n2", rand(1, 9));
         set("n3", rand(1, 9));

         action.echo(`%bar%
      |------| |------| |------|
      |- (%n1%) -| |- (%n2%) '|- (%n3%) -|
      |------| |------| |------|
      %bar%`, { asText: true });
      }
   });
}

// mod add spin