export interface Group {
    id: string;
    name: string;
    description: string;
    userIds: string[];
    resourceIds: string[];
}

export const groups: Group[] = [
    {
        id: '1',
        name: 'Developers',
        description: 'Group for all developers',
        userIds: ['u1', 'u2'],
        resourceIds: ['r1', 'r2'],
    },
    {
        id: '2',
        name: 'Designers',
        description: 'Group for all designers',
        userIds: ['u3'],
        resourceIds: ['r3'],
    },
];