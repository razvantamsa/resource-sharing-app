import express, { Request, Response } from 'express';
import groupsRouter from './groups';
import resourcesRouter from './resources';
import usersRouter from './users';

const app = express();
const port = 3000;

app.use('/api/groups', groupsRouter);
app.use('/api/resources', resourcesRouter);
app.use('/api/users', usersRouter);
app.use(express.json());

app.get('/api/status', (_: any, res: Response) => {
  res.send('Hello from App');
});


app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
