import { createChat } from './create-chat';
import { createFollows } from './create-follows';
import { createItems } from './create-items';
import { createUsers } from './create-users';

export const createTestData = async () => {
  await createUsers();

  await createItems();

  await createChat();

  await createFollows();
};
