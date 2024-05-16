{
  // Constraints in functions
  const addCourseToStudent = <
    T extends { id: number; name: string; email: string }
  >(
    student: T
  ) => {
    const course = "CSE360";
    return {
      ...student,
      course,
    };
  };

  const studentOne = addCourseToStudent({
    id: 225,
    name: "Rakin",
    email: "test123@gmail.com",
  });
  //   const studentTwo = addCourseToStudent({
  //     id: 225,
  //     email: "test123@gmail.com",
  //   });
  //   const studentThree = addCourseToStudent({
  //     random: "random",
  //   });

  // Constraints Using Key of
  type Vehicle = {
    bike: string;
    car: string;
    ship: string;
  };

  type Owner = keyof Vehicle;
  const result: Owner = "ship";

  const getPropertyValue = <X, Y extends keyof X>(obj: X, key: Y) => {
    return obj[key];
  };

  const resultOne = getPropertyValue({ name: "Rakin", id: 255 }, "id");
  console.log(resultOne);
  //   const resultTwo = getPropertyValue({ name: "Rakin", id: 255 }, "email");
  //   console.log(resultTwo);

  //
}
