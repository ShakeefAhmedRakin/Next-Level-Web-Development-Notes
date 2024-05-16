## Classes And Objects

### Classes:

```typescript
// Creating Class
class Animal {
  // Constructor
  constructor(
    public name: string,
    public species: string,
    public sound: string
  ) {}

  // Methods
  makeSound() {
    console.log(`${this.name} : ${this.sound}`);
  }
}
```

- **Classes:** Classes in TypeScript are blueprints for creating objects. They encapsulate data (properties) and behavior (methods) into a single unit.

- **Constructor:** The constructor method initializes the properties of the class when an object is created. In this example, the constructor takes parameters for the name, species, and sound of the animal.

- **Methods:** Methods are functions defined within the class that perform actions related to the class. Here, `makeSound` is a method that logs the sound of the animal to the console.

### Objects:

```typescript
// Creating Objects And Calling Its Methods
const dog = new Animal("German Shepherd", "Dog", "Bark");
const cat = new Animal("Persian", "Cat", "Mew");

dog.makeSound();
cat.makeSound();
```

- **Objects:** Objects are instances of classes. They are created using the `new` keyword followed by the class name, along with any required constructor arguments.

- **Calling Methods:** Once objects are created, you can call their methods using dot notation (`object.method()`). In this example, `dog.makeSound()` and `cat.makeSound()` call the `makeSound` method of the `Animal` class for the `dog` and `cat` objects respectively.

## Inheritance

```typescript
class User {
  public name: string;
  public age: number;
  public address: string;
  constructor(name: string, age: number, address: string) {
    this.name = name;
    this.age = age;
    this.address = address;
  }
}

class Student extends User {
  getSleep(numHours: number) {
    console.log(`${this.name} will sleep for ${numHours} hours.`);
  }
}

class Teacher extends User {
  public designation: string;
  constructor(name: string, age: number, address: string, designation: string) {
    super(name, age, address); // Call the constructor of the base class (User)
    this.designation = designation;
  }

  takeClass(numClass: number) {
    console.log(`${this.name} will take ${numClass} classes.`);
  }
}
```

- **Inheritance:** Inheritance allows a class (subclass) to inherit properties and methods from another class (superclass). In this example, both `Student` and `Teacher` classes extend the `User` class, inheriting its properties (`name`, `age`, `address`) and constructor.

### `super` Keyword:

- The `super` keyword is used inside a subclass constructor to call the constructor of the superclass. It allows subclasses to initialize inherited properties.
- In the `Teacher` class constructor, `super(name, age, address)` calls the constructor of the `User` class to initialize the inherited properties (`name`, `age`, `address`).

### Access Modifiers (`public`):

- The `public` access modifier allows properties and methods to be accessed from outside the class.
- All properties in the `User` class are declared as `public`, making them accessible from instances of the class as well as its subclasses (`Student` and `Teacher`).

### Creating Instances and Using Inherited Methods:

```typescript
const studentOne = new Student("StudentOne", 25, "House AB");
studentOne.getSleep(5); // Output: StudentOne will sleep for 5 hours.

const teacherOne = new Teacher("TeacherOne", 35, "House BC", "CSE");
teacherOne.takeClass(5); // Output: TeacherOne will take 5 classes.
```

- Instances of `Student` and `Teacher` classes are created using the `new` keyword.
- Inherited methods (`getSleep` for `Student` and `takeClass` for `Teacher`) can be called on instances of their respective classes.

## Type Guarding

### Type Guard Using `typeof`:

```typescript
// Type Guard Using Type Of
type StringOrNum = string | number;
const add = (param1: StringOrNum, param2: StringOrNum): string | number => {
  if (typeof param1 === "number" && typeof param2 === "number") {
    return param1 + param2;
  } else {
    return param1.toString() + param2.toString();
  }
};
```

- **Explanation:**
  - `typeof` is used to check the type of a variable at runtime.
  - In the `add` function, `typeof param1 === "number" && typeof param2 === "number"` checks if both `param1` and `param2` are numbers.
  - If they are both numbers, the function returns their sum. Otherwise, it concatenates their string representations.

### Type Guard Using `in`:

```typescript
// Type Guard Using In
type NormalUser = {
  name: string;
};
type AdminUser = NormalUser & { role: "admin" };

const getUser = (user: NormalUser | AdminUser) => {
  if ("role" in user) {
    console.log(`${user.name} is ${user.role}`);
  } else {
    console.log(`${user.name} is not admin`);
  }
};

getUser({ name: "UserOne", role: "admin" });
getUser({ name: "UserTwo" });
```

- **Explanation:**
  - `in` is used to check if a property exists in an object.
  - In the `getUser` function, `"role" in user` checks if the `role` property exists in the `user` object.
  - If it exists, it means the user is an admin, so it prints the user's name and role. Otherwise, it prints that the user is not an admin.

### Type Guard Using `instanceof`:

```typescript
// Type Guard Using Instance Of
class Animal {
  name: string;
  species: string;
  constructor(name: string, species: string) {
    this.name = name;
    this.species = species;
  }
  makeSound() {
    console.log(`Making Sound`);
  }
}

class Dog extends Animal {
  constructor(name: string, species: string) {
    super(name, species);
  }
  makeBark() {
    console.log("I am barking");
  }
}

class Cat extends Animal {
  constructor(name: string, species: string) {
    super(name, species);
  }
  makeMeow() {
    console.log("I am meowing");
  }
}

// Using Instance of here
const isDog = (animal: Animal): animal is Dog => {
  return animal instanceof Dog;
};

const isCat = (animal: Animal): animal is Cat => {
  return animal instanceof Cat;
};

const getAnimalSound = (animal: Animal) => {
  if (isDog(animal)) {
    animal.makeBark();
  } else if (isCat(animal)) {
    animal.makeMeow();
  } else {
    animal.makeSound();
  }
};

const dog = new Dog("German Shepherd", "Dog");
const cat = new Cat("Persian", "Cat");

getAnimalSound(dog);
getAnimalSound(cat);
```

- **Explanation:**
  - `instanceof` is used to check if an object is an instance of a particular class.
  - In the `getAnimalSound` function, `animal instanceof Dog` and `animal instanceof Cat` are used to check if the `animal` object is an instance of `Dog` or `Cat` respectively.
  - Based on the result of these checks, the function calls specific methods (`makeBark` for `Dog`, `makeMeow` for `Cat`) or a default method (`makeSound` for `Animal`).

### Summary:

- **`typeof`:** Used to check the type of a variable.
- **`in`:** Used to check if a property exists in an object.
- **`instanceof`:** Used to check if an object is an instance of a particular class.
- Type guards help in narrowing down the types of variables or objects, enabling safer and more predictable code execution.

## Access Modifiers

```typescript
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
```

#### `public`:

- **Scope:** Accessible from outside the class, including instances and subclasses.
- **Usage:** Used to define properties or methods that are accessible from anywhere.
- **Example:** `public name: string;` allows `name` to be accessed and modified from outside the `BankAccount` class.

#### `private`:

- **Scope:** Accessible only within the class where it is defined.
- **Usage:** Used to hide implementation details and restrict access to certain properties or methods.
- **Example:** `private _balance: number;` ensures `_balance` can only be accessed and modified within the `BankAccount` class.

#### `protected`:

- **Scope:** Accessible within the class and its subclasses.
- **Usage:** Used to allow access to properties or methods within the class hierarchy but not from outside.
- **Example:** `protected interest: number;` allows `interest` to be accessed within the `BankAccount` class and its subclasses like `StudentAccount`.

#### `readonly`:

- **Scope:** Similar to `public`, accessible from outside the class.
- **Usage:** Used to define properties that cannot be modified after initialization.
- **Example:** `public readonly id: number;` ensures `id` can only be assigned a value once during object creation.

### Usage:

```typescript
class StudentAccount extends BankAccount {
  checkInterest() {
    console.log(`Interest Rate is ${this.interest}`);
  }
}

const UserOne = new BankAccount(0, "UserOne", 0, 15);

UserOne.checkBalance(); // Output: 0
UserOne.updateBalance(10); // Updates the balance by adding 10
UserOne.checkBalance(); // Output: 10
```

- In the `StudentAccount` class, we can access the `interest` property inherited from the `BankAccount` class because it's marked as `protected`.
- `UserOne` is an instance of the `BankAccount` class, and we can access its public methods like `checkBalance()` and `updateBalance()` to interact with the account.

### Limitations:

- **`private` Limitation:** Properties marked as `private` cannot be accessed or modified from outside the class where they are defined. This restricts direct manipulation but may require additional methods for interaction.
- **`protected` Limitation:** While `protected` allows access within the class hierarchy, it still restricts access from outside, which might limit flexibility in some scenarios.
- **`readonly` Limitation:** Properties marked as `readonly` cannot be modified after initialization. While this ensures immutability, it might limit scenarios where dynamic changes are required.

Let's dissect the code snippet and understand the concepts of getters and setters:

## Getters and Setters:

```typescript
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
```

#### Getter:

- **Usage:** Getters are methods that retrieve the value of a property.
- **Syntax:** `get propertyName() { return this._property; }`
- **Example:** `get getBalance() { return this._balance; }` allows accessing the `_balance` property without directly exposing it.

#### Setter:

- **Usage:** Setters are methods that update the value of a property.
- **Syntax:** `set propertyName(value) { ... }`
- **Example:** `set updateBalance(amount: number) { ... }` allows updating the `_balance` property while performing validation.

### Usage:

```typescript
const UserOne = new BankAccount(0, "UserOne", 0);

console.log(UserOne.getBalance); // Output: 0
UserOne.updateBalance = 10; // Update balance by 10
console.log(UserOne.getBalance); // Output: 10
```

- **Getter Usage:** `UserOne.getBalance` retrieves the current balance of the `UserOne` bank account.
- **Setter Usage:** `UserOne.updateBalance = 10` updates the balance of the `UserOne` bank account by adding 10.

### Summary:

- Getters provide a way to retrieve the value of a property without directly accessing it.
- Setters provide a way to update the value of a property while performing validation or other logic.
- Together, getters and setters offer encapsulation, allowing controlled access to class properties and ensuring data integrity.
