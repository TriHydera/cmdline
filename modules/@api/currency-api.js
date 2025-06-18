// Version: 1

var meta = {
  name: "@api/currency-api",
  ver: "1",
  deps: ["@cmd/storage-api"]
}

function load() {
  module.add("@cmd/storage-api", () => {
  const currency = action.storage.get("currency") || {
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
  });
}