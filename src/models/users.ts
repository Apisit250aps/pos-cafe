import { db } from '@/libs/database/client';
import { User } from 'next-auth';
const users = db.collection<User>('users');
export default users;
