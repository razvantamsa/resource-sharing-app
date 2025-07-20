export interface Resource {
    id: string;
    name: string;
    description: string;
    userIds: string[];
    groupIds: string[];
}

export const resources: Resource[] = [
    {
        id: '1',
        name: 'Projector',
        description: 'HD projector for presentations',
        userIds: ['u1', 'u2'],
        groupIds: ['g1']
    },
    {
        id: '2',
        name: 'Conference Room',
        description: 'Large room with video conferencing',
        userIds: ['u3'],
        groupIds: ['g1', 'g2']
    },
    {
        id: '3',
        name: 'Laptop',
        description: 'High performance laptop',
        userIds: ['u2'],
        groupIds: []
    }
];