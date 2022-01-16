import { Resource } from '../models/Resource';
import { resourceType } from '../models/enums'
import { promises as fs } from 'fs';
import { IResource } from '../models/interfaces/IResource';
import { Comment } from '../models/Comment';

async function createResource(imageName, body) {
    const resource = new Resource({
        imageName,
        resourceType: body.resourceType,
        address: body.address,
        description: body.description,
        shortDescription: body.shortDescription,
        isMD: body.isMD,
        date: body.date,
        ownerId: body.ownerId
    });
    await resource.save();
    return resource;
}

async function editResource(id, body) {
    const resource = await getResourceById(id) as IResource;
    const oldImg = resource.imageName;
    const oldPath = (`static/${oldImg}`);
    Resource.findByIdAndUpdate({ _id: id }, body, (err, result) => {
        if (err) console.log(err);

    });
    try {
        await fs.unlink(oldPath);
    } catch (err) {
        console.log(err);
    }


}

/*async function getUserByEmail(email: string) {
    const pattern = new RegExp(`^${email}$`, 'i');
    const user = await User.findOne({ email: { $regex: pattern } });
    return user;
}*/

async function getAllResources() {
    const allResources = await Resource.find({}).lean();
    console.log(allResources)
    return allResources;
}

async function getResourceById(id: string) {
    const resource = await Resource.findById(id).lean();
    console.dir(resource);
    return resource;
}

async function deleteResourceById(id: string) {
    const resource = await getResourceById(id);
    const imageName = resource.imageName;
    console.log(imageName);
    const path = `static/${imageName}`
    try {
        await fs.unlink(path);
        console.log(`deleted file:${path}`);
    } catch (err) {
        console.log(err);
    }
    const res = await Resource.findOneAndRemove({ _id: id });
    console.log(res);
    return res;
}

async function likeResource(resourceId, likes) {
    const resource = await Resource.findById(resourceId);
    resource.likes += Number(likes);
    await resource.save();
}

async function getResourceComments(resourceId) {
        const resource = await Resource.findById(resourceId).populate('comments');
        console.log(resource.comments)
        return resource.comments.map(c => c.text);        
    
}




export {
    createResource,
    getAllResources,
    getResourceById,
    editResource,
    deleteResourceById,    
    likeResource,
    getResourceComments
}