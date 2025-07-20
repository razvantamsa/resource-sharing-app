import express from 'express';
import { users } from './user.entity';

const router = express.Router();

/**
 * Returns all resources the user has access to:
    ○ Direct shares
    ○ Group-based shares
    ○ Global shares
 */
router.get('/user/:id/resources', (req, res) => {
    const user = users.find(u => u.id === req.params.id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
});

/**
 * Returns a list of users and how many resources each has access to.
 */
router.get('/users/with-resource-count', (req, res) => {
    res.json(users);
});


export default router;