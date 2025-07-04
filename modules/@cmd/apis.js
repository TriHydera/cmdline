// Version: 1.1

var meta = {
   name: "@cmd/apis",
   ver: "1.1",
   deps: ["@api/currency-api"]
}

function load() {
   core.module.add("@api/currency-api");
}