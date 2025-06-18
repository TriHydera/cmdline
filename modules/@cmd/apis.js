// Version: 1

   var meta = {
      name: "@cmd/apis",
      ver: "1",
      deps: ["@api/request-api", "@api/storage-api", "@api/currency-api", "@api/rand-number-api"]
   }

function load() {
   module.add("@api/request-api");
   module.add("@api/storage-api");
   module.add("@api/currency-api");
   module.add("@api/rand-number-api");
}