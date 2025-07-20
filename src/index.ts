import express, { Request, Response } from 'express';
import resourcesRouter from './resources';
import usersRouter from './users';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api/', resourcesRouter);
app.use('/api/', usersRouter);

app.get('/api/status', (_: any, res: Response) => {
  res.send('Hello from App');
});


app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
