  let { add } = module
  let { color } = utils

  vars.set("debug", 0)
  
  add("@cmd/core", () => {

    vars.set("bar", "===================================");

    action.echo(`%bar%
| Welcome to ${color("command line", "lightblue")}!
| Type ${color("\"help\"", "lightblue")} to get a
| list of commands
| Version: ${color("%version%", "lightblue")}
%bar%`)

add("@cmd/styler");
add("rainbow")
add("srapi")
add("@games/setup", () => {
cmd.run("games-setup", "")
})
  })