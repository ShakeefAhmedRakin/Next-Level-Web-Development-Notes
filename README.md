# Next-Level-Web-Development - Course Notes

> :warning: All graded assignments will be private until the end of the course.
>
> **To be Noted**<br> > _The content in this repository does not contain any content or media from the course itself. Therefore, it is not a substitute for the official course materials provided by Programming Hero. The materials and notes in this repository are based on my personal learning journey and are intended for educational purposes only._

![alt text](README_IMG.png)

Welcome to the repository containing my notes and learning materials from the <a href="https://web.programming-hero.com/home/level2">Next-Level-Web-Development</a> by Programming Hero [Batch 03].
As a student of this course, I've compiled this repository to consolidate my understanding of the concepts taught throughout the course.

## About the Course

The course is structured using missions that have various modules to provide a step-by-step progression through various technologies and tools that form the foundation of modern web development.

### Technologies Covered

- **TypeScript**
- **Mongoose**
- **ExpressJS**
- **Redux**
- **Next.js**
- **Cloud and Containers (Linux, Docker, Docker Compose, CI/CD, AWS services, Nginx)**
- **RDBMS (PostgreSQL)**
- **Prisma ORM**
- **Testing (Cypress, Jest, Supertest, React Testing Library, Vitest)**
- **GraphQL**
- **Software Engineering (SDLC, project management tools)**

## Repository Contents

This repository is a collection of my notes, code snippets, and links to my project implementations based on the course curriculum. Each mission has modules in them. <br>
The folders are named as **mission_number**\_title > **module_number**\_title

- Mission One : [TypeScript](./01_TypeScript/)
- Mission Two : [Mongoose](./02_MongoQueriesExpress/)

Feel free to explore the repository to reinforce your understanding of the concepts covered in the course.

# Setting Up ESLINT and PRETTIER for backend

Go to this [GitHub Repository](https://github.com/ShafiaChy/Eslint-Config-Setup?fbclid=IwZXh0bgNhZW0CMTAAAR0oypcqmKhOsmxULpi4SegNve0EImVZbxvDml_Tl0RfMOpPqb9RAWNzk1U_aem_AWyBotuzkkmLjSUqPg2IjO9gfrxVcEpbRMnlKjecB_JWrPAGzWdgx2X-ZD3AGyJbowi56vhi9meQ36efNnUcM1_P) (Provided by Programming Hero) to get started.

### [Project Folder]('./02_MongoQueriesExpress/Code/MongooseProject')

<br>

# Software Design Pattern

### MVC (Model-View-Controller) Architecture

**MVC** is a design pattern that separates an application into three interconnected components:

- **Model**: Manages the data and business logic.
- **View**: Handles the presentation and UI.
- **Controller**: Receives input and makes calls to model objects to retrieve data.

### Interfaces, Routes, Models, Views, Controllers

#### Interfaces

TypeScript interfaces define the shape of data objects, helping to ensure type safety throughout the application.

```typescript
interface User {
  name: string;
  email: string;
  password: string;
}
```

#### Routes

Routes define the endpoints of the API and map HTTP methods to controller actions.

```typescript
import { Router } from "express";
import { getUser, createUser } from "../controllers/userController";

const router = Router();

router.get("/user/:id", getUser);
router.post("/user", createUser);

export default router;
```

#### Models

Models are Mongoose schemas and represent the structure of your data in MongoDB.

```typescript
import { Schema, model } from "mongoose";
import { User } from "../interfaces/user";

const userSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export default model<User>("User", userSchema);
```

#### Views

In the context of an API, views can be thought of as the JSON responses sent back to clients.

```typescript
// Example of a simple JSON response in a controller
res.json({ success: true, data: user });
```

#### Controllers

Controllers contain the logic for handling requests and interacting with models.

```typescript
import { Request, Response } from "express";
import UserModel from "../models/userModel";

export const getUser = async (req: Request, res: Response) => {
  const user = await UserModel.findById(req.params.id);
  res.json({ success: true, data: user });
};

export const createUser = async (req: Request, res: Response) => {
  const user = new UserModel(req.body);
  await user.save();
  res.json({ success: true, data: user });
};
```

### Modular Pattern

The modular pattern involves organizing your code into self-contained modules, each responsible for a specific piece of functionality. This makes the codebase more manageable and scalable.

```plaintext
src/users/
  controllers/
    userController.ts
  interfaces/
    user.ts
  models/
    userModel.ts
  routes/
    userRoutes.ts
  services/
    userService.ts
  app.ts
  server.ts
```

### Benefits

- **Scalability**: Modular code can easily be extended with new features.
- **Maintainability**: Modules are easier to understand, test, and maintain.
- **Better Refactoring**: Changes in one part of the application are less likely to affect other parts.
- **Efficient Development**: Team members can work on different modules simultaneously without causing conflicts.

### Rules

#### DRY (Don't Repeat Yourself)

Avoid duplication by abstracting common functionality into reusable modules or functions.

#### Fat Model/Thin Controller

Keep controllers lightweight by offloading business logic to models or services.

### Coding Order (TypeScript)

A better-structured order for setting up a model and database interactions in TypeScript might be:

1. **Interface**: Define the shape of the data.
2. **Schema**: Create the Mongoose schema based on the interface.
3. **Model**: Create the Mongoose model from the schema.
4. **Service/Repository (Optional but recommended)**: Encapsulate DB queries and business logic.
5. **Controller**: Handle HTTP requests and responses, using the model or service.

### Example Implementation

1. **Interface** (`interfaces/user.ts`):

   ```typescript
   export interface User {
     name: string;
     email: string;
     password: string;
   }
   ```

2. **Schema** (`models/userSchema.ts`):

   ```typescript
   import { Schema } from "mongoose";
   import { User } from "../interfaces/user";

   const userSchema = new Schema<User>({
     name: { type: String, required: true },
     email: { type: String, required: true },
     password: { type: String, required: true },
   });

   export default userSchema;
   ```

3. **Model** (`models/userModel.ts`):

   ```typescript
   import { model } from "mongoose";
   import userSchema from "./userSchema";
   import { User } from "../interfaces/user";

   const UserModel = model<User>("User", userSchema);
   export default UserModel;
   ```

4. **Service** (`services/userService.ts`):

   ```typescript
   import UserModel from "../models/userModel";
   import { User } from "../interfaces/user";

   export const findUserById = async (id: string): Promise<User | null> => {
     return UserModel.findById(id).exec();
   };

   export const createUser = async (userData: User): Promise<User> => {
     const user = new UserModel(userData);
     return user.save();
   };
   ```

5. **Controller** (`controllers/userController.ts`):

   ```typescript
   import { Request, Response } from "express";
   import { findUserById, createUser } from "../services/userService";

   export const getUser = async (req: Request, res: Response) => {
     const user = await findUserById(req.params.id);
     res.json({ success: true, data: user });
   };

   export const createUser = async (req: Request, res: Response) => {
     const user = await createUser(req.body);
     res.json({ success: true, data: user });
   };
   ```

### Conclusion

By following the MVC pattern, using TypeScript interfaces for type safety, and adhering to principles like DRY and Fat Model/Thin Controller, you can build a scalable, maintainable, and efficient backend with TypeScript, Mongoose, and Express. Organizing code modularly further enhances development efficiency and scalability.
