// Version: 2.1

var meta = {
   name: "@games/spin",
   ver: "2.1",
   deps: []
}

function load() {
   let { randNumber } = utils;
   let { set: setVar } = core.vars;
   
   cmd.create({
      tag: "spin",
      help: "%tag%",
      category: "Games",
      run: () => {
         setVar("space", "                                  ".replace(/ /g, '\xa0'))
         setVar("space2", "                     ".replace(/ /g, '\xa0'))
         setVar("n1", randNumber(1, 9));
         setVar("n2", randNumber(1, 9));
         setVar("n3", randNumber(1, 9));
         
         core.action.echo(`\n%bar%
        %space%${utils.color("[ Spin ]", "lightgray")}
      %space2%|------| |------| |------|
      %space2%|- (%n1%) -| |- (%n2%) |- (%n3%) -|
      %space2%|------| |------| |------|
      %bar%`);
      }
   });
}
