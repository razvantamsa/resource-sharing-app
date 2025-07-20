import express, { Request, Response } from 'express';
import { resources } from './resource.entity';

const router = express.Router();

// Get all resources
router.get('/', (_req: Request, res: Response) => {
    res.json(resources);
});

// Get a single resource by id
router.get('/:id', (req: Request, res: Response) => {
    const resource = resources.find(r => r.id === req.params.id);
    if (!resource) {
        return res.status(404).json({ message: 'Resource not found.' });
    }
    res.json(resource);
});
export default router;