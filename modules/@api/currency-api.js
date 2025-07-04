// Version: 1.1

var meta = {
  name: "@api/currency-api",
  ver: "1.1",
  deps: []
}

function load() {
  const currency = core.storage.getItem("currency") || {
    balance: 0
  }
  
  core.vars.set("currency_prefix", "$");
  core.vars.set("currency_balance", currency.balance);
  
  api.currency = {
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