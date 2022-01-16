import { IResource} from "./IResource";


export interface IResourceIdentifiable extends IResource {
  _id: string;
}