# Advent of using JavaScript In Backend

The advent of Node.js revolutionized backend development by enabling JavaScript to run server-side. Ryan Dahl's creation in 2009 leveraged Chrome's V8 JavaScript engine, introducing an event-driven, non-blocking I/O model that proved highly efficient for handling concurrent requests. Integration with Libuv, a multi-platform support library, provided asynchronous event-driven I/O operations, essential for scalability and high concurrency. Asynchronous programming became mainstream, allowing developers to write non-blocking code and efficiently utilize system resources. Major companies quickly adopted Node.js, cementing its position as a powerhouse for building scalable and high-performance backend applications, ultimately solidifying JavaScript's role as a full-stack language.

# NodeJS Fundamentals

Modules are encapsulated units of code that enable developers to organize, reuse, and maintain JavaScript code more efficiently. They help in breaking down large applications into smaller, manageable pieces, making codebases more maintainable and scalable. Here's a comparison between CommonJS and ECMAScript Modules (ESM) with code snippets and comments:

### CommonJS:

CommonJS is a module system used in Node.js environments.

```javascript
// moduleOne.js
// Exporting a function using module.exports
function greet(name) {
  return `Hello, ${name}!`;
}
const a = 10;

module.exports = { greet, a };

// app.js
// Requiring the moduleOne module
const moduleOne = require("./moduleOne");

// Using the greet function and const a
console.log(moduleOne.greet("John")); // Output: Hello, John!
console.log(moduleOne.a); // Output: 10
```

#### Comments:

- In `greet.js`, a function `greet` is defined and exported using `module.exports`.
- In `app.js`, the `greet` module is imported using `require`, and the exported function is used.

### ECMAScript Modules (ESM):

ESM is a standardized module system supported in modern browsers and recent versions of Node.js.

```javascript
// greet.mjs
// Exporting a function using export keyword
export function greet(name) {
  return `Hello, ${name}!`;
}

// app.mjs
// Importing the greet module
import { greet } from "./greet.mjs";

// Using the greet function
console.log(greet("John")); // Output: Hello, John!
```

#### Comments:

- In `greet.mjs`, a function `greet` is defined and exported using the `export` keyword.
- In `app.mjs`, the `greet` module is imported using the `import` statement, and the exported function is used.
- Note the file extension `.mjs` for ECMAScript modules.

### Comparison:

- **Syntax:** CommonJS uses `module.exports` and `require` for exports and imports, while ESM uses `export` and `import` statements.
- **Asynchronous Loading:** CommonJS loads modules synchronously, while ESM supports both synchronous and asynchronous loading.
- **Static Analysis:** ESM allows for static analysis, enabling tools like tree shaking for dead code elimination, which CommonJS lacks.
- **Browser Support:** ESM is natively supported in modern browsers, enabling developers to use the same module syntax on both the client and server sides.

In summary, while both CommonJS and ESM serve the purpose of modularizing JavaScript code, ESM offers additional benefits such as support for asynchronous loading and static analysis, making it the preferred choice for modern JavaScript development.

# Path Module

The `path` module in Node.js provides utilities for working with file and directory paths. It's particularly useful for ensuring cross-platform compatibility when dealing with paths in file systems. Here's an explanation of `path.dirname()` and other widely used functions, including their pathing style for Linux, Windows, and macOS:

### `path.dirname()`

The `path.dirname()` function returns the directory name of a path. It operates differently based on the platform:

- **Linux and macOS:** The directory separator is `/`, so `path.dirname('/foo/bar/file.txt')` returns `/foo/bar`.
- **Windows:** The directory separator is `\`, so `path.dirname('C:\\foo\\bar\\file.txt')` returns `C:\foo\bar`.

### Other Widely Used Functions:

1. **`path.join()`**: Concatenates path segments using the platform-specific separator. For example:

   ```javascript
   const fullPath = path.join("/foo", "bar", "file.txt"); // Output: '/foo/bar/file.txt'
   ```

2. **`path.resolve()`**: Resolves a sequence of paths or path segments into an absolute path. For example:

   ```javascript
   const absolutePath = path.resolve("foo", "bar", "file.txt"); // Output: '/path/to/current/directory/foo/bar/file.txt'
   ```

3. **`path.basename()`**: Returns the last portion of a path. For example:

   ```javascript
   const fileName = path.basename("/foo/bar/file.txt"); // Output: 'file.txt'
   ```

4. **`path.extname()`**: Returns the file extension of a path. For example:

   ```javascript
   const extension = path.extname("/foo/bar/file.txt"); // Output: '.txt'
   ```

5. **`path.normalize()`**: Normalizes a path, resolving `.` and `..` segments. For example:

   ```javascript
   const normalizedPath = path.normalize("/foo//bar/../file.txt"); // Output: '/foo/file.txt'
   ```

6. **`path.relative()`**: Returns the relative path from one path to another. For example:
   ```javascript
   const relativePath = path.relative(
     "/data/orandea/test/aaa",
     "/data/orandea/impl/bbb"
   ); // Output: '../../impl/bbb'
   ```

# Filesystem Module

The `fs` (file system) module in Node.js provides methods for interacting with the file system on your computer. It allows you to read from and write to files, create and delete files and directories, manipulate file metadata, and perform other file-related operations. Here's an explanation of `readFileSync`, `writeFileSync`, and why synchronous file operations are generally considered bad practice in backend development, along with an example of how to perform file operations asynchronously using thread pools:

### `readFileSync`:

- `readFileSync` is a synchronous method used to read data from a file.
- It blocks the execution of the rest of the code until the entire file is read.
- It returns the contents of the file as a buffer or a string, depending on whether you specify an encoding.

Example without encoding:

```javascript
const fs = require("fs");

const data = fs.readFileSync("file.txt");
console.log(data.toString()); // Outputs buffer content <Buffer 0d 01 41 41 .. .. ..>
```

Example with encoding (e.g., UTF-8):

```javascript
const fs = require("fs");

const data = fs.readFileSync("file.txt", "utf-8");
console.log(data); // Outputs the string contents of 'file.txt'
```

### `writeFileSync`:

- `writeFileSync` is a synchronous method used to write data to a file.
- It blocks the execution of the rest of the code until the data is written to the file.

Example:

```javascript
const fs = require("fs");

const data = "Hello, World!";
fs.writeFileSync("output.txt", data);
console.log("Data written to file.");
```

### Why Synchronous Operations are Bad in Backend:

Synchronous file operations can block the Node.js event loop, leading to poor performance and scalability issues, especially in applications with high concurrency requirements. Node.js is designed to be non-blocking and asynchronous, and synchronous operations can degrade its performance by preventing it from efficiently handling multiple requests concurrently.

### Asynchronous File Operations Using Thread Pools:

To perform file operations asynchronously without blocking the event loop, you can use asynchronous versions of `fs` module methods or offload file operations to a worker thread pool using the `worker_threads` module. Here's an example using asynchronous `readFile` and `writeFile` methods:

```javascript
const fs = require("fs");

// Asynchronous file read operation
fs.readFile("file.txt", "utf-8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  console.log(data); // Outputs the contents of 'file.txt'

  // Asynchronous file write operation
  const newData = "Updated data";
  fs.writeFile("output.txt", newData, (err) => {
    if (err) {
      console.error("Error writing to file:", err);
      return;
    }
    console.log("Data written to file.");
  });
});
```

In this example, the file read and write operations are performed asynchronously, allowing Node.js to continue executing other code while waiting for the file operations to complete. This approach ensures that the event loop remains unblocked and the application remains responsive, making it more suitable for backend development.

# Creating Your Own Events

In an event-driven architecture in JavaScript, the flow of the program is determined by events and event handlers. Here are some small but important things to understand about event-driven architecture:

1. **Event Loop**: JavaScript is single-threaded and uses an event loop to manage asynchronous operations. The event loop continuously checks the event queue for new events and executes their associated event handlers.

2. **Events**: Events are actions or occurrences that happen in the system. Examples include mouse clicks, keypresses, HTTP requests, and timer expirations.

3. **Event Handlers**: Event handlers are functions that are executed in response to specific events. They are registered to listen for certain events and are called when those events occur.

4. **Event Emitter**: An event emitter is an object that emits events and allows other objects (listeners) to subscribe to those events and execute event handlers when the events occur.

Here's how to set up events using `.on` to subscribe to events and `.emit` to emit events:

```javascript
// Importing EventEmitter class from 'events' module
const EventEmitter = require("events");

// Creating an instance of EventEmitter
const myEmitter = new EventEmitter();

// Subscribing to the 'myEvent' event with an event handler
myEmitter.on("myEvent", (arg1, arg2) => {
  console.log("Event occurred:", arg1, arg2);
});

// Emitting the 'myEvent' event with arguments
myEmitter.emit("myEvent", "Argument 1", "Argument 2");
```

In this example:

- We create an instance of `EventEmitter` named `myEmitter`.
- We subscribe to the `myEvent` event using `.on`, providing a callback function to handle the event.
- We emit the `myEvent` event using `.emit`, passing arguments that will be received by the event handler.

When the `myEvent` event is emitted, the event handler function subscribed to it will be executed, logging the provided arguments to the console.

Understanding event-driven architecture is crucial for developing scalable, asynchronous JavaScript applications, as it allows you to effectively manage and respond to various events in the system.

# Stream and Buffer

In Node.js, streams and buffers are essential concepts for handling data efficiently, especially when dealing with large datasets or network communication. Let's explain streams and buffers using the provided code snippet:

### Streams:

Streams in Node.js provide an interface for reading from or writing to a continuous flow of data. There are four types of streams:

1. **Readable Stream**: Used for reading data from a source.
2. **Writable Stream**: Used for writing data to a destination.
3. **Duplex Stream**: Represents a stream that is both readable and writable, allowing data to flow in both directions.
4. **Transform Stream**: A type of duplex stream where the output is computed based on the input data.

In the code snippet, we're using a readable stream (`fs.createReadStream`) to read data from a file and stream it to the response object (`res`) of an HTTP server.

### Buffers:

Buffers in Node.js are temporary storage areas in memory that hold raw binary data. They are used to store data while it is being moved from one place to another. Buffers are particularly useful when dealing with binary data or when data needs to be manipulated at a lower level than strings.

Now, let's annotate the provided code snippet to illustrate how streams and buffers are used:

```javascript
const http = require("http");
const fs = require("fs");

// Create an HTTP server
const server = http.createServer();

// Event listener for incoming requests
server.on("request", (req, res) => {
  // Check if the request URL is '/read-file' and the method is 'GET'
  if (req.url === "/read-file" && req.method === "GET") {
    // Create a readable stream to read data from the file
    const readableStream = fs.createReadStream(
      process.cwd() + "/texts/readbhul.txt"
    );

    // Event handler for 'data' event - data is read in chunks (buffers)
    readableStream.on("data", (buffer) => {
      // Write the buffer data to the response
      res.write(buffer);
    });

    // Event handler for 'end' event - stream has finished reading data
    readableStream.on("end", () => {
      // Send a response indicating the end of streaming
      res.end("The streaming is over !");
    });

    // Event handler for 'error' event - an error occurred while reading the file
    readableStream.on("error", (error) => {
      console.log(error);
      // Send a response with error status code and message
      res.statusCode = 500;
      res.end("Something went wrong!");
    });
  }
});

// Start the HTTP server on port 5000
server.listen(5000, () => {
  console.log(`Server is listening on port 5000`);
});
```

In this code snippet:

- We create a readable stream using `fs.createReadStream` to read data from the file `readbhul.txt`.
- As data is read from the file, it is emitted in chunks (buffers), and the `'data'` event is triggered.
- We write each buffer of data to the response object (`res`) using `res.write()`.
- When the entire file has been read (`'end'` event), we send a response indicating that the streaming is over.
- If an error occurs during the stream reading process (`'error'` event), we log the error and send an error response to the client.

# Standards For A Typescript Express Project

## [Link To Project File](./Code/ExpressTypeScript/)

Run the backend using two shells. In one write "tsc -w' to keep compiling the ts files into js and in the other one, write nodemon dist/app/server.js to keep the server running after any changes made.

### 1. **Import Statements:**

- The code uses ECMAScript module syntax (`import`) to import modules from Express.
- `{ NextFunction, Request, Response }` are imported from Express to provide type definitions for request and response objects.

```typescript
import express, { NextFunction, Request, Response } from "express";
```

### 2. **Express App Initialization:**

- The Express app is initialized using `express()` function, and the instance is stored in the variable `app`.

```typescript
const app = express();
```

### 3. **Middleware:**

- Middleware functions are defined and used to log request details (`logger`) and parse JSON bodies (`express.json()`).
- Middleware functions are applied using `app.use()`.

```typescript
app.use(express.json());

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.url, "\n", req.method, "\n", req.ip);
  next();
};
```

### 4. **Routers:**

- Routers are created using `express.Router()`.
- Routes are defined on routers, and routers are mounted on the main app using `app.use()`.

```typescript
const userRouter = express.Router();
const courseRouter = express.Router();
app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
```

### 5. **Route Handlers:**

- Route handler functions are defined for specific HTTP methods and paths.
- Route handlers have access to request and response objects with type definitions.

```typescript
userRouter.post("/create-user", logger, (req: Request, res: Response) => {
  /* ... */
});
courseRouter.post("/create-course", logger, (req: Request, res: Response) => {
  /* ... */
});
```

### 6. **Error Handling:**

- A global error handler middleware is defined to catch any errors that occur during request processing.
- Error handler middleware takes four parameters, including the error object.
- Errors are properly handled with appropriate status codes and error messages.

```typescript
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  /* ... */
});
```

### 7. **Fallback Route:**

- A fallback route (`app.all("*")`) is defined to handle requests for unknown routes.
- It responds with a 404 status code and a "Not Found" message.

```typescript
app.all("*", (req: Request, res: Response) => {
  /* ... */
});
```
