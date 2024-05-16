{
  // --------Conditional Types-------------

  type a1 = null;
  type b1 = undefined;

  type x = a1 extends null ? true : false; // Conditional Types

  type y = a1 extends null ? true : b1 extends undefined ? undefined : any; // Nested Conditionals

  // Implementation

  type VehicleList = {
    bike: string;
    car: string;
    ship: string;
  };

  type CheckVehicle<T> = T extends keyof VehicleList ? true : false;

  type VehicleListHasBike = CheckVehicle<"bike">;
  type VehicleListHasShip = CheckVehicle<"tractor">;

  // --------Mapped Types-----------
  type AreaNumber = {
    height: number;
    width: number;
  };
  type AreaString = {
    [key in keyof AreaNumber]: string;
  };
  type AreaBool = {
    [key in keyof AreaNumber]: boolean;
  };

  // --------Look Up Types-----------
  type Height = AreaNumber["height"];
  type Width = AreaBool["width"];

  // --------Look Up Types + Mapped Types-----------
  type CustomArea<T> = {
    [key in keyof T]: T[key];
  };

  const area: CustomArea<{ height: string; width: number }> = {
    height: "150",
    width: 150,
  };
}
