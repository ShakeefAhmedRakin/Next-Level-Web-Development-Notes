"use strict";
{
    // Creating Class
    class Animal {
        // Constructor
        constructor(name, species, sound) {
            this.name = name;
            this.species = species;
            this.sound = sound;
        }
        // Methods
        makeSound() {
            console.log(`${this.name} : ${this.sound}`);
        }
    }
    // Creating Objects And Calling It's Methods
    const dog = new Animal("German Shepherd", "Dog", "Bark");
    const cat = new Animal("Persian", "Cat", "Mew");
    dog.makeSound();
    cat.makeSound();
}
