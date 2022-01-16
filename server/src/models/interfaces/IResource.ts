export interface IResource {
    imageName: string,
    resourceType: string,
    address: string,
    description: string,
    shortDescription: string,
    isMD: boolean,
    date: Date | string,
    ownerId: string
}