// Version: 1.1

function load() {
  const meta = {
    name: "wallet",
    ver: "1.1",
    deps: ["@api/currency-api"]
  }
  
  module.add("@api/currency-api");
  
  cmd.create({
    tag: "wallet",
    category: "Wallet",
    aliases: ["bal", "balance"],
    run: args => {
      action.echo(`%bar%
      ${utils.color("[ Your personal wallet ]", "lightgray")}
      
      You have %currency_prefix%%currency_balance% in your wallet!
      %bar%`, { color: "lightblue" })
    }
  })
}