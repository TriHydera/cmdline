// Version: 1.1

var meta = {
  name: "@cmd/printer",
  ver: "1.1",
   deps: []
}

function load() {
  api.printer = (file) => {
    $.get(`storage/printer/${file}.txt`, function(data) {
        let rows = data.split("\n");
        rows.forEach(row => {
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
      api.printer(args[0]);
    }
  })
}