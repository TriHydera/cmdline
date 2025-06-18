// Version: 1

var meta = {
  name: "@cmd/printer",
  ver: "1",
   deps: []
}

function load() {
  action.printer = (file) => {
    $.get(`storage/printer/${file}.txt`, function(data) {
        let rows = data.split("\n");
        rows.forEach(row => {
          action.echo(row, "", true);
        });
      })
      .fail(() => {});
  }
  
  cmd.create({
    tag: "print",
    help: "print [file]",
    category: "Printer",
    run: args => {
      action.printer(args[0]);
    }
  })
}