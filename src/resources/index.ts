import express, { Request, Response } from 'express';
import prisma from '../db';

const router = express.Router();

/**
 * Returns all users who have access to a given resource:
    ○ Directly shared users
    ○ Users in shared groups
    ○ All users if the resource is shared with everyone
 */
router.get('/resource/:id/access-list', async (req: Request, res: Response) => {
    const resourceId = parseInt(req.params.id, 10);

    if (isNaN(resourceId)) {
        return res.status(400).json({ message: 'Invalid resource ID' });
    }

    const resource = await prisma.resource.findUnique({
        where: { id: resourceId }
    });

    if (!resource) {
        throw new Error('Resource not found');
    }

    try {
        const users = await prisma.$queryRawUnsafe<any[]>(`
            SELECT DISTINCT u.*
            FROM "User" u
            WHERE 
                (
                    -- If resource is shared with everyone, include all users
                    (SELECT "sharedWithEveryone" FROM "Resource" WHERE id = $1) = true
                )
                OR
                (
                    -- Directly shared users
                    u.id IN (
                        SELECT "userId" FROM "ResourceUserShare" WHERE "resourceId" = $1
                    )
                    -- Users in groups that have access
                    OR u.id IN (
                        SELECT ug."userId"
                        FROM "UserGroup" ug
                        INNER JOIN "ResourceGroupShare" rgs ON ug."groupId" = rgs."groupId"
                        WHERE rgs."resourceId" = $1
                    )
                )
        `, resourceId);

        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Bad Request' });
    }
})

/**
 * Returns a list of all resources and how many users they are shared with (directly, via groups, or globally).
 */
router.get('/resources/with-user-count', async (req: Request, res: Response) => {
    try {
        const resourcesWithCounts = await prisma.$queryRawUnsafe<any[]>(`
            SELECT
            r.*,
            CASE
                WHEN r."sharedWithEveryone" = true THEN
                CAST((SELECT COUNT(*) FROM "User") AS INTEGER)
                ELSE
                CAST((
                    SELECT COUNT(DISTINCT u.id)
                    FROM "User" u
                    WHERE
                    u.id IN (
                        SELECT "userId" FROM "ResourceUserShare" WHERE "resourceId" = r.id
                    )
                    OR u.id IN (
                        SELECT ug."userId"
                        FROM "UserGroup" ug
                        INNER JOIN "ResourceGroupShare" rgs ON ug."groupId" = rgs."groupId"
                        WHERE rgs."resourceId" = r.id
                    )
                ) AS INTEGER)
            END AS "sharedUserCount"
            FROM "Resource" r
        `);

        res.json(resourcesWithCounts);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Bad Request' });
    }
});

export default router;