import express from 'express';
import { users } from './user.entity';

const router = express.Router();

// GET /users - get all users
router.get('/', (req, res) => {
    res.json(users);
});

// GET /users/:id - get user by id
router.get('/:id', (req, res) => {
    const user = users.find(u => u.id === req.params.id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
});

export default router;