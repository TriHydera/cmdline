// Version: 1

function load(){
  module.add("@cmd/currency-api");
  
  cmd.create({
    tag: "wallet",
    category: "Wallet",
    aliases: ["bal", "balance"],
    run: args => {
      action.echo(`%bar%
      Your personal wallet
      
      You have %currency_prefix%%currency_balance% in your wallet!
      %bar%`, { color: "lightblue" })
    }
  })
}