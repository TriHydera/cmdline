// Version: 1.1.1

var meta = {
  name: "@cmd/printer",
  ver: "1.1.1",
  deps: []
}

function load() {
  let { echo, helpinfo } = core.action;
  
  api.printer = (file) => {
    $.get(`storage/printer/${file}`, function(data) {
        let rows = data.split("\n");
        rows.forEach(row => {
          if(row == "") {
            action.echo("\n")
          }
          action.echo(row.replace(/ /g, '\xa0'), "", true);
        });
      })
      .fail(() => {});
  }
  
  cmd.create({
      tag: "print",
      help: "%tag% [file]",
      category: "Printer",
      run: args => {
        if (!args[0]) {
          echo(helpinfo("print"))
        } else {
          action.echo(`\n[ File: ${args[0]} ]\n`, { color: "lightgrey" });
        api.printer(args[0]);
      }
    }
  })
}