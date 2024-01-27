import { config } from 'dotenv';
import { deleteAllUsers } from './utils';

config();

beforeAll(async () => {
  await deleteAllUsers();
});
