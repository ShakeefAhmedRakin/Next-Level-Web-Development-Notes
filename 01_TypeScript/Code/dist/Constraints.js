"use strict";
{
    // Constraints in functions
    const addCourseToStudent = (student) => {
        const course = "CSE360";
        return Object.assign(Object.assign({}, student), { course });
    };
    const studentOne = addCourseToStudent({
        id: 225,
        name: "Rakin",
        email: "test123@gmail.com",
    });
    const result = "ship";
    const getPropertyValue = (obj, key) => {
        return obj[key];
    };
    const resultOne = getPropertyValue({ name: "Rakin", id: 255 }, "id");
    console.log(resultOne);
    //   const resultTwo = getPropertyValue({ name: "Rakin", id: 255 }, "email");
    //   console.log(resultTwo);
    //
}
