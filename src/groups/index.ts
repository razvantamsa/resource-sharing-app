import { Router, Request, Response } from 'express';
import { groups, Group } from './group.entity';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.json(groups);
});

export default router;