export interface AddRole {
    name: string,
    description: string
}

export interface UpdateRole {
    id: string,
    data: {
        name: string,
    }
}

