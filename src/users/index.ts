import express from 'express';
import prisma from '../db';

const router = express.Router();

/**
 * Returns all resources the user has access to:
    ○ Direct shares
    ○ Group-based shares
    ○ Global shares
 */
router.get('/user/:id/resources', async (req, res) => {
    const userId = parseInt(req.params.id, 10);

    if (isNaN(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

    const user = await prisma.user.findUnique({
        where: { id: userId }
    });

    if (!user) {
        throw new Error('User not found');
    }


    try {
        const resources = await prisma.$queryRawUnsafe<any[]>(`
            SELECT DISTINCT r.*
            FROM "Resource" r

            -- Direct shares
            LEFT JOIN "ResourceUserShare" rus ON rus."resourceId" = r.id AND rus."userId" = ${userId}

            -- Group-based shares
            LEFT JOIN "UserGroup" ug ON ug."userId" = ${userId}
            LEFT JOIN "ResourceGroupShare" rgs ON rgs."groupId" = ug."groupId" AND rgs."resourceId" = r.id

            WHERE 
                r."sharedWithEveryone" = TRUE
                OR rus."userId" IS NOT NULL
                OR rgs."groupId" IS NOT NULL;
        `);

        res.json(resources);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Bad Request' });
    }
});

/**
 * Returns a list of users and how many resources each has access to.
 */
router.get('/users/with-resource-count', async (req, res) => {
    try {
        const results = await prisma.$queryRawUnsafe<any[]>(`
            SELECT 
                u.id, 
                u.username,
                COUNT(DISTINCT COALESCE(direct_shares."resourceId", group_shares."resourceId", global_shares.id)) AS resource_count
            FROM "User" u
            
            -- Direct shares
            LEFT JOIN "ResourceUserShare" direct_shares ON direct_shares."userId" = u.id
            
            -- Group-based shares  
            LEFT JOIN "UserGroup" ug ON ug."userId" = u.id
            LEFT JOIN "ResourceGroupShare" group_shares ON group_shares."groupId" = ug."groupId"
            
            -- Global shares (resources shared with everyone)
            LEFT JOIN "Resource" global_shares ON global_shares."sharedWithEveryone" = TRUE
            
            WHERE (
                direct_shares."resourceId" IS NOT NULL 
                OR group_shares."resourceId" IS NOT NULL 
                OR global_shares."sharedWithEveryone" = TRUE
            )
            
            GROUP BY u.id, u.username;
        `);

        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Bad Request' });
    }
});


export default router;