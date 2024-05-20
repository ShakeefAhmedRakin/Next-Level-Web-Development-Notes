import express, { Application, Request, Response } from 'express';
import cors from 'cors';
const app: Application = express();

// PARSERS
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  const a = 10;
  const b = 20;
  res.send(a);
});

export default app;
