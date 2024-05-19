import express, { NextFunction, Request, Response } from "express";

const app = express();

// Parser
app.use(express.json());

// MiddleWare
const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.url, "\n", req.method, "\n", req.ip);
  next();
};

// Router
const userRouter = express.Router();
const courseRouter = express.Router();
app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);

userRouter.post("/create-user", logger, (req: Request, res: Response) => {
  const user = req.body;
  console.log(user);
  res.json({
    succuss: true,
    data: user,
  });
});

courseRouter.post("/create-course", logger, (req: Request, res: Response) => {
  const course = req.body;
  console.log(course);
  res.json({
    succuss: true,
    data: course,
  });
});

app.get(
  "/",
  logger,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send("Server is working");
    } catch (error) {
      next(error);
    }
  }
);

app.post("/", logger, (req: Request, res: Response) => {
  console.log(req.body);
  res.json({
    message: "Data Received",
  });
});

app.all("*", (req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    message: "Not Found.",
  });
});

// Global Error Handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    res.status(400).json({
      success: false,
      message: "Something went wrong.",
    });
  }
});

export default app;
