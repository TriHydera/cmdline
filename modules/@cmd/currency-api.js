// Version: 1

function load(){
  module.add("@cmd/storage-api");
  
  const currency = action.storage.getValue("currency") || {
    balance: 0
  }
  
  vars.set("currency_prefix", "$");
  vars.set("currency_balance", currency.balance);
  
  action.currency = {
    getBalance: () => {
      return currency.balance;
    },
    addBalance: (amount) => {
      currency.balance += amount;
    },
    takeBalance: (amount) => {
      currency.balance -= amount;
    },
    setBalance: (amount) => {
      currency.balance = amount;
    }
  }
}