// Version: 1

var meta = {
  name: "@cmd/rand-number",
  ver: "1",
  deps: []
}

function load() {
  cmd.create({
    tag: "rand",
    aliases: ["ran"],
    help: "rand [min] [max]",
    category: "Rand Number",
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
}