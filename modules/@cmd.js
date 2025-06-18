// Version: 1

var meta = {
   name: "@cmd",
   ver: "1",
   deps: ["@cmd/core", "@cmd/apis", "@cmd/styler", "@cmd/printer", "@cmd/rand-number"]
}

function load() {
   module.add("@cmd/core");
   module.add("@cmd/apis");
   module.add("@cmd/printer");
   module.add("@cmd/rand-number");
}