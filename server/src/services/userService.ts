import { User } from '../models/User';
import { userRole } from '../models/enums';
import * as bcrypt from 'bcrypt';
import { IUserIdentifiable } from '../models/interfaces/IUserIdentifiable'
import { Resource } from '../models/Resource';
import * as mongoose from "mongoose";


async function createUser(email: string, hashedPassword: string,
    firstName: string, lastName: string, role: userRole) {
    const user = new User({
        email,
        hashedPassword,
        firstName,
        lastName,
        role
    });
    await user.save();
    return user;
}

async function addAdmins(username, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const admin = await User.findOne({ email: 'sysadmin@abv.bg' });
        let exists = false;
        if (admin != null) {
            exists = await bcrypt.compare(password, admin.hashedPassword);
        }
        if (!exists)
            await createUser(username, hashedPassword, 'Sysadmin', 'AdminSys', userRole.Admin);
    } catch (err) {
        console.log(err);
    }
}

async function getUserById(id: string) {
    return User.findById(id);
}

async function getUserByUserName(email: string) {
    const pattern = new RegExp(`^${email}$`, 'i');
    const user = await User.findOne({ email: { $regex: pattern } });
    return user;
}

async function updateUser(userId, body) {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    body.hashedPassword = hashedPassword;
    delete body.password;
    User.findByIdAndUpdate({ _id: userId }, body, (err, result) => {
        if (err) console.log(err);

    });
}

async function bookResource(resourceId, userId) {
    const resource = await Resource.findById(resourceId);
    const ownerId = resource.ownerId.toString();
    if (userId === ownerId) {
        throw new Error(`Owner cannot be a guest!`);
    }
    if (resource.guests.map(x => x.toString()).includes(userId)) {
        throw new Error("You are already a guests!");
    }
    resource.guests.push(userId);
    resource.save();
}


async function getAllUsers() {
    const users = await User.find({});
    const usersReturned: IUserIdentifiable[] = users.map(user => {
        return {
            _id: user._id,
            email: user.email,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName
        };
    });
    return usersReturned;
}

async function deleteUserById(id) {
    const deleted = await User.findOneAndRemove({ _id: id });
    return deleted;
}

async function deleteManyById(ids: string[]) {
    const objIds = ids.map(i => mongoose.Types.ObjectId(i));
    const deletedCount = await User.remove({ _id: { $in: objIds } });
    return deletedCount;
}

export {
    createUser,
    getUserByUserName,
    getUserById,
    updateUser,
    addAdmins,
    bookResource,
    getAllUsers,
    deleteUserById,
    deleteManyById
}