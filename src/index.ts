import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.use(express.json());

// 1. GET endpoint
app.get('/api/endpoint1', (req: Request, res: Response) => {
  res.send('Hello from Endpoint 1');
});

// 2. POST endpoint
app.post('/api/endpoint2', (req: Request, res: Response) => {
  res.json({ received: req.body });
});

// 3. PUT endpoint
app.put('/api/endpoint3/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.send(`Updated item with ID ${id}`);
});

// 4. DELETE endpoint
app.delete('/api/endpoint4/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.send(`Deleted item with ID ${id}`);
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
