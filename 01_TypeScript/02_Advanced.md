## Type Assertion or Type Narrowing

Type assertion, also known as type narrowing, is a feature in TypeScript that allows you to explicitly inform the compiler about the type of a value when TypeScript is unable to infer it automatically. It's useful when you know more about the type of a value than TypeScript does at a certain point in your code.

Let's break down the code provided to understand type assertion:

```typescript
// Define a function kgToGm that takes a parameter 'value' of type string or number
const kgToGm = (value: string | number): string | number | undefined => {
    // Check if 'value' is a string
    if (typeof value === 'string') {
        // If 'value' is a string, convert it to a number and multiply by 1000
        return parseFloat(value) * 1000;
    } 
    // Check if 'value' is a number
    if (typeof value === 'number') {
        // If 'value' is a number, multiply it by 1000
        return value * 1000;
    }
}

// Call kgToGm with a number argument and assert the result to be a number
const result1 = kgToGm(1000) as number;

// Call kgToGm with a string argument and assert the result to be a string
const result2 = kgToGm('1000') as string;

// Define a custom error type
type CustomError = {
    message: string;
}

try {
    // CODE
} catch(error) {
    // Log the error message if it's of type CustomError
    console.log((error as CustomError).message);
}
```

### Notes:

1. **kgToGm Function:**
   - The function `kgToGm` takes a parameter `value` which can be either a string or a number.
   - Inside the function, it checks the type of `value`.
   - If `value` is a string, it converts it to a number using `parseFloat` and then multiplies by 1000.
   - If `value` is already a number, it directly multiplies it by 1000.
   - The return type of the function is `string | number | undefined`, as the function may return either a string or a number, or undefined if the input is not valid.

2. **Type Assertion in Assignments:**
   - `result1` is assigned the result of calling `kgToGm(1000)` and asserted to be of type `number`.
   - `result2` is assigned the result of calling `kgToGm('1000')` and asserted to be of type `string`.

3. **Type Assertion in Error Handling:**
   - Inside the `catch` block, `(error as CustomError)` asserts that `error` is of type `CustomError`.
   - If the assertion succeeds, it accesses the `message` property of the error and logs it.

## Type Vs Interface


```typescript
// Define a type User1
type User1 = {
    name: string;
    age: number;
}

// Define an interface User2
interface User2 {
    name: string;
    age: number;
}

// Intersection (Type Aliasing) Using Interfaces (You can also mix and match types and interfaces while extending)
interface UserWithRole extends User2 {
    role: string;
}

const user2: UserWithRole = {
    name: "Andy",
    age: 24,
    role: 'admin'
}

// Interface Arrays (array of numbers)
interface Rolls {
    [index: number]: number;
}

// Interface Functions (Add)
interface Add {
    (num1: number, num2: number): number;
}

// Use type aliases for arrays, functions, primitives etc.
// Use Interfaces for objects
```

### Differences and Uses:

1. **Type vs Interface:**
   - Both `type` and `interface` can be used to define the shape of data structures.
   - `type` allows you to create an alias for a particular data type, while `interface` defines a contract for an object.
   - Use `type` when you need to create a union, intersection, or alias for a specific type.
   - Use `interface` when defining the shape of an object or when you want to extend or implement contracts.

2. **Intersection Using Interfaces:**
   - In TypeScript, you can use interfaces for intersection to extend multiple interfaces into a single one.
   - In the example provided, `UserWithRole` extends `User2` by adding a `role` property.

3. **Interface Arrays:**
   - You can define index signatures in interfaces to describe arrays or objects with dynamic property names.
   - In the example, `Rolls` is an interface representing an array of numbers, where the index is of type number.

4. **Interface Functions:**
   - Interfaces can also describe function types.
   - In the example, `Add` is an interface representing a function that takes two numbers as parameters and returns a number.

## Generics Type

```typescript
// Define an array of numbers
const rollNumbers: Array<number> = [3, 4, 5];

// Define an array of strings
const names: Array<string> = ['1', '2', '3'];

// Define a type alias for an array of numbers
type GenericArray = Array<number>;

// Define an array of numbers using the GenericArray type
const testMarks: GenericArray = [30, 40, 50];

// Define a generic type DynamicArray
type DynamicArray<T> = Array<T>;

// Define a dynamic array of numbers
const rollNumbersDynamic: DynamicArray<number> = [3, 4, 5];

// Define a dynamic array of strings
const namesDynamic: DynamicArray<string> = ['1', '2', '3'];

// Define a dynamic array of objects with a specified structure
const usersArray: DynamicArray<{ name: string, age: number, role?: string }> = [
    {
        name: "UserOne",
        age: 24
    },
    {
        name: "UserTwo",
        age: 22
    },
    {
        name: "UserThree",
        age: 10,
        role: 'admin'
    }
];

// Define a generic tuple type
type GenericTuple<X, Y> = [X, Y];

// Define a tuple of strings
const listNames: GenericTuple<string, string> = ['UserOne', 'UserTwo'];

// Define a tuple of a number and an object with a specified structure
const userInfo: GenericTuple<number, {
    name: string,
    email: string
}> = [25000, {
    name: 'UserName',
    email: "test123@gmail.com"
}];
```

### Explanation:

1. **Array with Specific Types:**
   - Arrays like `rollNumbers` and `names` are declared with specific types (number and string respectively). These arrays can only contain elements of those specific types.

2. **Type Alias for Array Type:**
   - `GenericArray` is a type alias created for arrays of numbers. This alias can be used to declare arrays with number elements.

3. **Generic Dynamic Array:**
   - `DynamicArray<T>` is a generic type that can be used to define arrays with elements of any type `T`.
   - This allows for the creation of arrays with dynamic types based on the context or requirement.

4. **Generic Tuple:**
   - `GenericTuple<X, Y>` is a generic type representing a tuple with two elements of types `X` and `Y`.
   - It can be used to create tuples with elements of different types, providing flexibility and type safety.



## Generics Interfaces


```typescript
// Define an interface Developer with generic types T and X
interface Developer<T, X = null> {
    name: string;
    computer: {
        brand: string;
        model: string;
        releaseYear: number;
    }
    smartWatch: T;
    bike?: X;
}

// Define DeveloperOne with a specific smartWatch type
const DeveloperOne: Developer<{
    brand: string;
    model: string;
    display: string;
}> = {
    name: "Rakin",
    computer: {
        brand: "ASUS",
        model: 'B123',
        releaseYear: 2019,
    },
    smartWatch: {
        brand: "Amazon",
        model: "AmazFit123",
        display: "OLED"
    }
}

// Define DeveloperTwo with specific smartWatch and bike types
const DeveloperTwo: Developer<{
    brand: string;
    model: string;
    display: string;
    WaterResistance: boolean;
}, {
    name: string;
    CC: number;
}> = {
    name: "Rakin",
    computer: {
        brand: "ASUS",
        model: 'B123',
        releaseYear: 2019,
    },
    smartWatch: {
        brand: "Amazon",
        model: "AmazFit123",
        display: "OLED",
        WaterResistance: true
    },
    bike: {
        name: "Honda",
        CC: 250
    }
}
```

### Explanation:

1. **Interface with Generics:**
   - The `Developer` interface is defined with two generic parameters `T` and `X`.
   - `T` is used to represent the type of the `smartWatch` property, while `X` is an optional parameter used to represent the type of the `bike` property.
   - The interface includes properties for the developer's name, computer details, smartwatch, and an optional bike.

2. **Using Developer Interface:**
   - `DeveloperOne` and `DeveloperTwo` are instances of the `Developer` interface.
   - `DeveloperOne` has a specific type for the `smartWatch` property, defined as `{ brand: string; model: string; display: string; }`.
   - `DeveloperTwo` has specific types for both `smartWatch` and `bike` properties, defined as `{ brand: string; model: string; display: string; WaterResistance: boolean; }` and `{ name: string; CC: number; }` respectively.

3. **Generic Parameters:**
   - By using generics, the `Developer` interface allows flexibility in defining the types of the `smartWatch` and `bike` properties.
   - `T` and `X` serve as placeholders for the actual types that will be provided when using the interface.



## Generics Function

```typescript
// Define a function createArrayWithGeneric with a generic type parameter T
const createArrayWithGeneric = <T>(params: T): T[] => {
    // Create an array with a single element of type T and return it
    return [params];
}

// Create an array of strings using the createArrayWithGeneric function
const arrayOfString = createArrayWithGeneric<string>('Bangladesh');

// Create an array of objects using the createArrayWithGeneric function
const arrayOfObject = createArrayWithGeneric<object>({ name: 'Rakin' });

console.log(arrayOfString, arrayOfObject);

// Define a type UserInfo
type UserInfo = { name: string; age: number };

// Create an array of UserInfo objects using the createArrayWithGeneric function
const arrayOfObjectUserInfo = createArrayWithGeneric<UserInfo>({ name: 'Rakin', age: 25 });

console.log(arrayOfObjectUserInfo);
```

### Explanation:

1. **Function with Generics:**
   - The `createArrayWithGeneric` function is defined with a generic type parameter `T`.
   - This function takes a single parameter `params` of type `T`.
   - It returns an array containing a single element of type `T`.

2. **Using the Function with Generics:**
   - `createArrayWithGeneric<string>('Bangladesh')` creates an array containing a single string element `'Bangladesh'`.
   - `createArrayWithGeneric<object>({ name: 'Rakin' })` creates an array containing a single object with the property `name` set to `'Rakin'`.
   - The types specified inside the angle brackets (`<string>` and `<object>`) are used to infer the type of the parameter `params` and the return type of the function.

3. **Using Generics with Custom Types:**
   - `type UserInfo = { name: string; age: number };` defines a custom type `UserInfo` representing user information.
   - `createArrayWithGeneric<UserInfo>({ name: 'Rakin', age: 25 })` creates an array containing a single element of type `UserInfo` with the specified properties.


## Constraints 

### Constraints in Functions:
```typescript
// Define a function addCourseToStudent with a constraint on the type parameter T
const addCourseToStudent = <T extends { id: number; name: string; email: string }>(
  student: T
) => {
  const course = "CSE360";
  return {
    ...student,
    course,
  };
};

// Call addCourseToStudent with an object that satisfies the constraint
const studentOne = addCourseToStudent({
  id: 225,
  name: "Rakin",
  email: "test123@gmail.com",
});

// Constraints ensure that only objects with required properties can be passed to the function
```

In this example, `T extends { id: number; name: string; email: string }` serves as a constraint on the type parameter `T`. It ensures that only objects with properties `id`, `name`, and `email` can be passed to the function `addCourseToStudent`. 

### Constraints Using Key of:
```typescript
// Define types Vehicle and Owner
type Vehicle = {
  bike: string;
  car: string;
  ship: string;
};

type Owner = keyof Vehicle;

// Assign a value to Owner type
const result: Owner = "ship";

// Define a function getPropertyValue with constraints using keyof
const getPropertyValue = <X, Y extends keyof X>(obj: X, key: Y) => {
  return obj[key];
};

// Call getPropertyValue to get the value of a property from an object
const resultOne = getPropertyValue({ name: "Rakin", id: 255 }, "id");
console.log(resultOne);
```

In this part, `keyof X` serves as a constraint for the type parameter `Y`. It ensures that `Y` can only be a key that exists in the type `X`. This way, when calling `getPropertyValue`, you're ensured that the key you pass is a valid property of the object `X`.

### Usage of Key of:
```typescript
// Using keyof to access properties dynamically
const vehicle: Vehicle = {
  bike: "Yamaha",
  car: "Toyota",
  ship: "Titanic",
};

// Accessing properties dynamically using keyof
const propertyName: keyof Vehicle = "car";
const propertyValue = vehicle[propertyName];

console.log(propertyValue);
```

Here, `keyof Vehicle` allows you to define a variable `propertyName` that can only hold keys that exist in the `Vehicle` type. You can then use this key to access properties of the `vehicle` object dynamically.

### Summary:
- Constraints ensure that only specific types or structures can be used in certain contexts.
- `keyof` allows you to create constraints based on keys of objects, ensuring type safety when accessing properties dynamically.
- Constraints are useful for enforcing rules and ensuring type safety in functions and data manipulation.


## Async Operations Using TypeScript 

### Fetching Data Example:

```typescript
// Define a type Something
type Something = { something: string };

// Define a function createPromise that returns a Promise<Something>
const createPromise = (): Promise<Something> => {
  return new Promise<Something>((resolve, reject) => {
    const data: Something = { something: "Data Received." };
    if (data) {
      resolve(data);
    } else {
      reject("Failed To Receive Data.");
    }
  });
};

// Define an async function showData that awaits the promise returned by createPromise
const showData = async (): Promise<Something> => {
  const data: Something = await createPromise();
  console.log(data);
  return data;
};

// Call showData to display the data received
showData();
```

This section demonstrates a simple example of fetching data asynchronously using promises. The `createPromise` function returns a Promise that resolves to an object of type `Something`. The `showData` function is an async function that awaits the result of `createPromise` and logs the received data to the console.

### Actual Data Fetching:

```typescript
// Define a type Todo
type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

// Define an async function getTodo that fetches todo data from an API
const getTodo = async (): Promise<Todo> => {
  // Fetch todo data from an API
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  // Parse the response body as JSON
  const data = await res.json();
  console.log(data);
  return data; // Return the fetched todo data
};

// Call getTodo to fetch todo data from the API
getTodo();
```

In this part, we define a type `Todo` representing the structure of todo objects. The `getTodo` function is an async function that fetches todo data from an API using the `fetch` function. It awaits the response, parses the JSON body, and returns the fetched todo data.

### Implementing Type Checking:

To ensure type safety when working with async operations, follow these steps:

1. **Define Types:** Define types for the data you expect to receive from async operations. This ensures type checking during compilation.

2. **Specify Return Types:** Specify the return type of async functions as `Promise<T>` where `T` is the type of data expected to be returned.

3. **Type Assertion:** When working with external APIs, use type assertion or casting to ensure the received data matches the expected type.

By following these steps, you can implement async operations with type checking to ensure your code is robust and type-safe.

## Conditional. Mapped And LookUp Types

### Conditional Types:
```typescript
type a1 = null;
type b1 = undefined;

type x = a1 extends null ? true : false; // Conditional Types

type y = a1 extends null ? true : b1 extends undefined ? undefined : any; // Nested Conditionals
```
- **Conditional Types:** Conditional types allow you to conditionally select one of two possible types based on a condition.
- In the example:
  - `type x` evaluates to `true` because `a1` is `null`.
  - `type y` first checks if `a1` is `null`, and if so, it returns `true`. Otherwise, it checks if `b1` is `undefined`. If `b1` is `undefined`, it returns `undefined`, otherwise, it returns `any`.

### Mapped Types:
```typescript
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
```
- **Mapped Types:** Mapped types allow you to transform the properties of an existing type into new properties with potentially different types.
- In the example:
  - `AreaString` maps each property in `AreaNumber` to a `string` type.
  - `AreaBool` maps each property in `AreaNumber` to a `boolean` type.

### Lookup Types:
```typescript
type Height = AreaNumber["height"];
type Width = AreaBool["width"];
```
- **Lookup Types:** Lookup types allow you to access the type of a specific property within another type.
- In the example:
  - `Height` retrieves the type of the `height` property from `AreaNumber`, which is `number`.
  - `Width` retrieves the type of the `width` property from `AreaBool`, which is `boolean`.

### Look Up Types + Mapped Types:
```typescript
type CustomArea<T> = {
  [key in keyof T]: T[key];
};

const area: CustomArea<{ height: string; width: number }> = {
  height: "150",
  width: 150,
};
```
- **Combining Look Up Types + Mapped Types:** Here, we define a generic type `CustomArea` that takes an object type `T` and maps each property in `T` to its corresponding value type.
- `area` is an example of using `CustomArea` with specific types for `height` and `width`.

### Summary:
- Conditional types allow for conditional selection of types based on conditions.
- Mapped types transform the properties of an existing type into new properties with potentially different types.
- Lookup types allow access to the types of specific properties within other types.
- Combining lookup types and mapped types can be powerful for creating generic utilities that manipulate the properties and types of objects dynamically.