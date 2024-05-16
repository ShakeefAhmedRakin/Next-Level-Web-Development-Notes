"use strict";
{
    class User {
        constructor(name, age, address) {
            this.name = name;
            this.age = age;
            this.address = address;
        }
    }
    class Student extends User {
        getSleep(numHours) {
            console.log(`${this.name} will sleep for ${numHours} hours.`);
        }
    }
    class Teacher extends User {
        constructor(name, age, address, designation) {
            super(name, age, address);
            this.designation = designation;
        }
        takeClass(numClass) {
            console.log(`${this.name} will take ${numClass} classes.`);
        }
    }
    const studentOne = new Student("StudentOne", 25, "House AB");
    studentOne.getSleep(5);
    const TeacherOne = new Teacher("TeacherOne", 35, "House BC", "CSE");
    TeacherOne.takeClass(5);
}
