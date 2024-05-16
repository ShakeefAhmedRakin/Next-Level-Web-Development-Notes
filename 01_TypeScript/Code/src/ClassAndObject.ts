{
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

  // Creating Objects And Calling It's Methods
  const dog = new Animal("German Shepherd", "Dog", "Bark");
  const cat = new Animal("Persian", "Cat", "Mew");

  dog.makeSound();
  cat.makeSound();
}
