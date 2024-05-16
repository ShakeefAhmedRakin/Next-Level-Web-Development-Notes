## Why TypeScript?

**Shortcomings of JavaScript Addressed by TypeScript:**

1. **Lack of Static Typing:** JavaScript is dynamically typed, meaning variable types are determined at runtime. This can lead to runtime errors and makes it challenging to catch type-related bugs during development.

2. **Limited Tooling Support:** JavaScript lacks comprehensive tooling support for large-scale projects, such as advanced code navigation, refactoring, and static analysis.

3. **Absence of Compile-Time Checks:** JavaScript does not provide compile-time checks for type-related errors. Developers only discover these errors during runtime, which can be time-consuming and error-prone to debug.

4. **Scalability Concerns:** As JavaScript projects grow in size and complexity, maintaining code quality and preventing regressions becomes increasingly challenging due to its dynamic nature.

**Advantages of TypeScript over JavaScript:**

1. **Static Typing:** TypeScript introduces static typing, allowing developers to define types for variables, function parameters, and return values. This helps catch type-related errors during development and provides better code documentation.

2. **Enhanced Tooling Support:** TypeScript comes with rich tooling support, including code navigation, auto-completion, refactoring, and static analysis. This improves developer productivity and enables better code maintenance in large projects.

3. **Compile-Time Checks:** TypeScript performs static type checking during compilation, detecting type-related errors before runtime. This helps prevent common bugs and improves code reliability.

4. **Code Maintainability:** With static typing and advanced tooling, TypeScript facilitates better code organization, readability, and maintainability, especially in large-scale projects. Types provide self-documentation and make it easier for developers to understand code intent.

5. **Ecosystem Compatibility:** TypeScript is a superset of JavaScript, meaning existing JavaScript code can be gradually migrated to TypeScript. It integrates seamlessly with JavaScript libraries and frameworks, allowing developers to leverage existing ecosystem resources.

**How TypeScript Works:**

1. **Type Annotations:** Developers define types using annotations, such as primitives (number, string, boolean), custom types, interfaces, and generics.

2. **Type Inference:** TypeScript infers types based on context, reducing the need for explicit type annotations. This helps minimize verbosity while maintaining type safety.

3. **Compilation:** TypeScript code is compiled to plain JavaScript using the TypeScript compiler (tsc). During compilation, TypeScript performs static type checking, detects errors, and emits corresponding JavaScript code.

4. **Incremental Compilation:** TypeScript supports incremental compilation, recompiling only modified files and their dependencies. This improves compilation performance, especially in large projects.

5. **IDE Integration:** TypeScript integrates with popular Integrated Development Environments (IDEs) such as Visual Studio Code, providing features like IntelliSense, code navigation, and error highlighting.

6. **Runtime Behavior:** Once compiled to JavaScript, TypeScript code behaves identically to equivalent handwritten JavaScript. Types are erased during compilation and do not impact runtime performance or behavior.

## Setting Up TypeScript Compiler

1. **Installation:**
   Ensure you have Node.js installed on your system. You can install TypeScript globally using npm (Node Package Manager) by running:

   ```
   npm install -g typescript
   tsc -v
   ```

2. **Writing TypeScript Code:**
   Create a TypeScript file (e.g., `index.ts`) and write your TypeScript code. For example:

   ```typescript
   let course: string = "Next level web development";
   console.log(course);
   ```

3. **Compiling TypeScript to JavaScript:**
   Run the TypeScript Compiler (`tsc`) followed by the name of your TypeScript file. This will generate a corresponding JavaScript file in the same directory:

   ```
   tsc index.ts
   ```

4. **Configuring the Compiler:**
   You can customize the behavior of the TypeScript Compiler by generating a `tsconfig.json` file. This file can be created using the `--init` flag with `tsc`. It allows you to specify compiler options such as input/output directories, target JavaScript version, and more.

   ```
   tsc --init
   ```

5. **Editing `tsconfig.json`:**
   Open `tsconfig.json` in a text editor to modify compiler options according to your project requirements. You can specify the `rootDir` for input TypeScript files and `outDir` for output JavaScript files among other options.

6. **Compiling Using Configuration:**
   Once `tsconfig.json` is configured, you can simply run `tsc` without specifying any file names. The compiler will use the settings from `tsconfig.json`:

   ```
   tsc
   ```

7. **Executing JavaScript:**
   After compiling TypeScript to JavaScript, you can run the generated JavaScript file using Node.js:

   ```
   node index.js
   ```

## TypeScript Basic Data Types

```typescript
// 1. String:
let firstName: string = "Rakin"; // Declaring a variable of type string with value "Rakin".

// 2. Number:
let roll: number = 123; // Declaring a variable of type number with value 123.

// 3. Boolean:
let isAdmin: boolean = true; // Declaring a variable of type boolean with value true.

// 4. Undefined:
let x: undefined = undefined; // Declaring a variable of type undefined with no value assigned.

// 5. Null:
let y: null = null; // Declaring a variable of type null with value null.

// 6. Any:
let d: any; // Declaring a variable of type any, which can hold values of any data type.

// 7. Array of Strings:
let friends: string[] = ["Test1", "Test2"]; // Declaring an array of strings.

// 8. Array of Numbers:
let rollList: number[] = [1, 2, 3]; // Declaring an array of numbers.

// 9. Tuple:
let coordinates: [number, number] = [1, 5]; // Declaring a tuple with two elements, both of type number.

// 10. Tuple with Mixed Types:
let ageName: [number, string] = [50, "Rakin"]; // Declaring a tuple with elements of different types: number and string.

// 11. Object with dynamic properties:
let user: {
  firstName: string;
  middleName?: string; // Optional
  lastName: string;
  company: "Programming Hero"; // Literal Type
  readonly country: "Bangladesh"; // Fixed
} = {
  company: "Programming Hero",
  firstName: "John",
  lastName: "Doe",
};
```

## TypeScript Functions

```typescript
// Normal Functions With Type Setting For Arguments, Return Elements And Default Values
function add(num1: number, num2: number = 10): number {
  return num1 + num2;
}

// Arrow Function With Type Setting For Arguments And Return Elements
const add = (num1: number, num2: number): number => num1 + num2;

// Object Methods
const poorUser: {
  name: string;
  balance: number;
} = {
  name: "Rakin",
  balance: 0,
  addBalance(balance: number) {
    this.balance = this.balance + balance;
  },
};

// Callback Function ( Map )
const arr: number[] = [1, 2, 3, 4];

const newArray: number[] = arr.map((elem: number): number => elem * elem);
```

## TypeScript Operators

```typescript
// Spread Operator
const brothers: string[] = ["BroOne", "BroTwo", "BroThree"];
const sisters: string[] = ["SisOne", "SisTwo", "SisThree"];

brothers.push(...sisters); // ["BroOne", "BroTwo", "BroThree","SisOne", "SisTwo", "SisThree"]

const TeacherOneInfo: {
  name: string;
  age: number;
} = {
  name: "John",
  age: 24,
};

const TeacherOneCourses: {
  Prisma: boolean;
  DBMS: boolean;
} = {
  Prisma: true,
  DBMS: false,
};

const TeacherOneAllInfo = {
  ...TeacherOneInfo,
  ...TeacherOneCourses,
}; // {name : 'John',age : 24, Prisma : true, DBMS : false}

// Rest Operator
const greetFriends = (...friends: string[]) => {
  friends.forEach((friend) => console.log(`Hi ${friend}`));
};

greetFriends('fr1','fr2',.....,'frN')
```

## TypeScript Destructuring

```typescript
// Object Destructuring
const TeacherInfo = {
  name: "John",
  age: 24,
  address: {
    country: "Bangladesh",
    street: "123",
  },
};

// Destructuring Using Name Aliases
const {
  name: TeacherName,
  address: { street: TeacherStreet },
} = TeacherInfo;

console.log(TeacherName, TeacherStreet);

// Array Destructuring
const friends: string[] = ["fr1", "fr2", "fr3", "fr4", "fr5"];

const [friendOne, , friendThree, ...friendFourFive] = friends;

console.log(friendOne); // fr1
console.log(friendThree); // fr3
console.log(friendFourFive); // [fr4, fr5]
```

## TypeScript Type Aliasing

```typescript

type UserName = string;
type IsAdmin = boolean;

const userName : UserName = 'Rakin';
const isAdmin : IsAdmin = true;


type Student = {
  name: string;
  age: number;
  gender: string;
  contact?: string;
  address: string;
};

const studentOne : Student = {
    name : 'Rakin'
    .
    .
    .
    address:
}

const studentTwo : Student = {
    name : 'Andy'
    .
    .
    .
    address:
}


type Add = (num1:string,num2:string) => number;
const add: Add = (num1,num2) => num1+ num2;

```

## Union And Intersection Types

```typescript
type Developer = "FrontEnd" | "BackEnd";
const newDeveloperOne: Developer = "FrontEnd"; // Can only accept FrontEnd and BackEnd

type DevOps = "Hosting" | "Testing";
type FullStackDeveloper = Developer | DevOps;
const newDeveloperTwo: FullStackDeveloper = "Testing"; // Can only accept FrontEnd, BackEnd ,Developer, DevOps

type FrontEndDeveloper :{
    skills : string[];
    designationOne : 'FrontEnd'
}
type BackEndDeveloper : {
    skills : string[];
    designationTwo : "BackEnd"
}

type FullStack = FrontEndDeveloper & BackEndDeveloper;

const newDeveloperThree : FullStack = {
    skills : ['HTML','CSS'],
    designationOne : 'FrontEnd',
    designationTwo : "BackEnd"
}


```

## Nullish Coalescing

```typescript
// Make Decisions If Something Is Null or Undefined
const isAuthenticated = null;

const userType = isAuthenticated ?? "Guest"; // Returns Guest if Null/Undefined else returns isAuthenticated

type User = {
  name: string;
  address: {
    city: string;
    presentAddress: string;
    permanentAddress?: string;
  };
};

const userOne: User = {
  name: "Rakin",
  address: {
    city: "Dhaka",
    presentAddress: "Dhaka 123",
  },
};
// Above permanent address is undefined. So..
const permanentAddressOfUserOne =
  user?.address?.permanentAddress ?? "Not Given";
```

## Nullable, Unknown And Never

```typescript
// Nullable
const searchName = (value: string | null) => {
  console.log(value ? "Searching" : "Nothing To Search");
};

// Unknown
const getSpeedInMeterPerSecond = (value: unknown): string => {
  if (typeof value === "number") {
    // logic
  }
};

// Never ( if a function will never return anything)
const throwError = (msg: string): never => {
  throw new Error(msg);
};
```
