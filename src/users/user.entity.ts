export interface User {
    id: string;
    firstName: string;
    lastName: string;
    bio?: string;
    groupIds: string[];
    resourceIds: string[];
}

export const users: User[] = [
    {
        id: '1',
        firstName: 'Alice',
        lastName: 'Smith',
        bio: 'Enthusiastic developer.',
        groupIds: ['group1', 'group2'],
        resourceIds: ['resource1', 'resource2'],
    },
    {
        id: '2',
        firstName: 'Bob',
        lastName: 'Johnson',
        bio: 'Loves open source.',
        groupIds: ['group2'],
        resourceIds: ['resource3'],
    },
    {
        id: '3',
        firstName: 'Carol',
        lastName: 'Williams',
        groupIds: [],
        resourceIds: [],
    },
];