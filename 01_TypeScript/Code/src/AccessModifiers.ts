{
  class BankAccount {
    public readonly id: number;
    public name: string;
    private _balance: number;
    protected interest: number;

    constructor(id: number, name: string, balance: number, interest: number) {
      this.id = id;
      this.name = name;
      this._balance = balance;
      this.interest = interest;
    }

    public checkBalance() {
      console.log(this._balance);
    }

    public updateBalance(amount: number) {
      if (this._balance + amount < 0) {
        console.log("Balance cannot be less than zero.");
      } else {
        this._balance += amount;
      }
    }
  }

  class StudentAccount extends BankAccount {
    checkInterest() {
      console.log(`Interest Rate is ${this.interest}`);
    }
  }

  const UserOne = new BankAccount(0, "UserOne", 0, 15);

  UserOne.checkBalance();
  UserOne.updateBalance(10);
  UserOne.checkBalance();
}
