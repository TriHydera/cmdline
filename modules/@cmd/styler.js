// Version: 1

function load() {
  let { create } = cmd;

  create({
    tag: "background",
    help: "background [color]",
    category: "Styler",
    aliases: ["bg"],
    run: args => {
      $("body").css("background-color", args[0]);
      $("#input").css("background-color", args[0]);
    }
  });
}

function unload() { }