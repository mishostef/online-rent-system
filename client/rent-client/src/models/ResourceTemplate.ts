import { resource } from "./enums/resource";
import { IResource } from "./IResource";


export class ResourceTemplate implements IResource {    
    address: string;
    description: string;
    date: Date;
    imageName: string;
    resourceType: resource;
    shortDescription: string;
    isMD: boolean;

    constructor(address: string = '',
        description: string = '',
        date: Date = new Date(),
        imageName: string = '',
        resourceType: resource = resource.villa,
        shortDescription: string='',
         isMD: boolean=false) {
        this.address = address;
        this.description = description;
        this.date = date;
        this.imageName = imageName;
        this.resourceType = resourceType;
        this.shortDescription = shortDescription;
        this.isMD = isMD;

    }

}