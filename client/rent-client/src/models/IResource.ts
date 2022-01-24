import { resource } from "./enums/resource"


export interface IResource {
  address: string,
  description:string,
  shortDescription:string,
  date:Date,
  imageName: string,
  resourceType: resource,
  isMD:boolean,
  likes?:number
}