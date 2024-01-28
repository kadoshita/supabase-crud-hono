import { deleteAllUsers } from './utils';

beforeAll(async () => {
  await deleteAllUsers();
});
