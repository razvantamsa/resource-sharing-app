import express, { Request, Response } from 'express';
import { resources } from './resource.entity';

const router = express.Router();

/**
 * Returns all users who have access to a given resource:
    ○ Directly shared users
    ○ Users in shared groups
    ○ All users if the resource is shared with everyone
 */
router.get('/resource/:id/access-list', (req: Request, res: Response) => {
    const resource = resources.find(r => r.id === req.params.id);
    if (!resource) {
        return res.status(404).json({ message: 'Resource not found.' });
    }
    res.json(resource);
})

/**
 * Returns a list of all resources and how many users they are shared with (directly, via groups, or globally).
 */
router.get('/resources/with-user-count', (req: Request, res: Response) => {
    const resource = resources.find(r => r.id === req.params.id);
    if (!resource) {
        return res.status(404).json({ message: 'Resource not found.' });
    }
    res.json(resource);
})

export default router;