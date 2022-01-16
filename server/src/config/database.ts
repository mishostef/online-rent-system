import { connect } from 'mongoose';
import { constants } from './constants';
import { User } from '../models/User';
import { addAdmins } from '../services/userService';

export async function startDb(): Promise<void> {
    await connect(constants.DB_CONNECTION_STRING);
    try {
        await addAdmins('sysadmin@abv.bg','@bracadAb#$7!');
    } catch (err) {
        console.log(err);
    }
    console.log(`db ready`);
}