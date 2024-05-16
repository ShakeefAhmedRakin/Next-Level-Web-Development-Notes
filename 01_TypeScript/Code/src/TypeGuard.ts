{
  // Type Guard Using Type Of
  type StringOrNum = string | number;
  const add = (param1: StringOrNum, param2: StringOrNum): string | number => {
    if (typeof param1 === "number" && typeof param2 === "number") {
      return param1 + param2;
    } else {
      return param1.toString() + param2.toString();
    }
  };

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
}
