"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResourceComments = exports.likeResource = exports.deleteResourceById = exports.editResource = exports.getResourceById = exports.getAllResources = exports.createResource = void 0;
const Resource_1 = require("../models/Resource");
const fs_1 = require("fs");
function createResource(imageName, body) {
    return __awaiter(this, void 0, void 0, function* () {
        const resource = new Resource_1.Resource({
            imageName,
            resourceType: body.resourceType,
            address: body.address,
            description: body.description,
            shortDescription: body.shortDescription,
            isMD: body.isMD,
            date: body.date,
            ownerId: body.ownerId
        });
        yield resource.save();
        return resource;
    });
}
exports.createResource = createResource;
function editResource(id, body) {
    return __awaiter(this, void 0, void 0, function* () {
        const resource = yield getResourceById(id);
        const oldImg = resource.imageName;
        const oldPath = (`static/${oldImg}`);
        Resource_1.Resource.findByIdAndUpdate({ _id: id }, body, (err, result) => {
            if (err)
                console.log(err);
        });
        try {
            yield fs_1.promises.unlink(oldPath);
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.editResource = editResource;
/*async function getUserByEmail(email: string) {
    const pattern = new RegExp(`^${email}$`, 'i');
    const user = await User.findOne({ email: { $regex: pattern } });
    return user;
}*/
function getAllResources() {
    return __awaiter(this, void 0, void 0, function* () {
        const allResources = yield Resource_1.Resource.find({}).lean();
        console.log(allResources);
        return allResources;
    });
}
exports.getAllResources = getAllResources;
function getResourceById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const resource = yield Resource_1.Resource.findById(id).lean();
        console.dir(resource);
        return resource;
    });
}
exports.getResourceById = getResourceById;
function deleteResourceById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const resource = yield getResourceById(id);
        const imageName = resource.imageName;
        console.log(imageName);
        const path = `static/${imageName}`;
        try {
            yield fs_1.promises.unlink(path);
            console.log(`deleted file:${path}`);
        }
        catch (err) {
            console.log(err);
        }
        const res = yield Resource_1.Resource.findOneAndRemove({ _id: id });
        console.log(res);
        return res;
    });
}
exports.deleteResourceById = deleteResourceById;
function likeResource(resourceId, likes) {
    return __awaiter(this, void 0, void 0, function* () {
        const resource = yield Resource_1.Resource.findById(resourceId);
        resource.likes += Number(likes);
        yield resource.save();
    });
}
exports.likeResource = likeResource;
function getResourceComments(resourceId) {
    return __awaiter(this, void 0, void 0, function* () {
        const resource = yield Resource_1.Resource.findById(resourceId).populate('comments');
        console.log(resource.comments);
        return resource.comments.map(c => c.text);
    });
}
exports.getResourceComments = getResourceComments;
//# sourceMappingURL=resourceService.js.map