{
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
    constructor(
      name: string,
      age: number,
      address: string,
      designation: string
    ) {
      super(name, age, address);
      this.designation = designation;
    }

    takeClass(numClass: number) {
      console.log(`${this.name} will take ${numClass} classes.`);
    }
  }

  const studentOne = new Student("StudentOne", 25, "House AB");
  studentOne.getSleep(5);
  const TeacherOne = new Teacher("TeacherOne", 35, "House BC", "CSE");
  TeacherOne.takeClass(5);
}
