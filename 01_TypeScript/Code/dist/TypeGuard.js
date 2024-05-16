"use strict";
{
    const add = (param1, param2) => {
        if (typeof param1 === "number" && typeof param2 === "number") {
            return param1 + param2;
        }
        else {
            return param1.toString() + param2.toString();
        }
    };
    const getUser = (user) => {
        if ("role" in user) {
            console.log(`${user.name} is ${user.role}`);
        }
        else {
            console.log(`${user.name} is not admin`);
        }
    };
    getUser({ name: "UserOne", role: "admin" });
    getUser({ name: "UserTwo" });
    // Type Guard Using Instance Of
    class Animal {
        constructor(name, species) {
            this.name = name;
            this.species = species;
        }
        makeSound() {
            console.log(`Making Sound`);
        }
    }
    class Dog extends Animal {
        constructor(name, species) {
            super(name, species);
        }
        makeBark() {
            console.log("I am barking");
        }
    }
    class Cat extends Animal {
        constructor(name, species) {
            super(name, species);
        }
        makeMeow() {
            console.log("I am meowing");
        }
    }
    // Using Instance of here
    const getAnimalSound = (animal) => {
        if (animal instanceof Dog) {
            animal.makeBark();
        }
        else if (animal instanceof Cat) {
            animal.makeMeow();
        }
        else {
            animal.makeSound();
        }
    };
    const dog = new Dog("German Shepherd", "Dog");
    const cat = new Cat("Persian", "Cat");
    getAnimalSound(dog);
}
