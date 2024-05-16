{
  class BankAccount {
    public readonly id: number;
    public name: string;
    private _balance: number;

    constructor(id: number, name: string, balance: number) {
      this.id = id;
      this.name = name;
      this._balance = balance;
    }

    // Using Getter
    get getBalance() {
      return this._balance;
    }

    // Using Setter
    set updateBalance(amount: number) {
      if (this._balance + amount < 0) {
        console.log("Balance cannot be less than zero.");
      } else {
        this._balance += amount;
      }
    }
  }

  const UserOne = new BankAccount(0, "UserOne", 0);

  console.log(UserOne.getBalance);
  UserOne.updateBalance = 10;
  console.log(UserOne.getBalance);
}
