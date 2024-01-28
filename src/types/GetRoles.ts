export interface GetRoles {
    _id: string,
    __v: number
    name: string,
    description: string,
    createdAt: string,
    updatedAt: string
}

export interface GetRolesApiResponse {
    data: GetRoles[],
    message: string,
    success: string
 }