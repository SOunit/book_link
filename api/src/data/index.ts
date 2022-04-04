import { createChat } from './create-chat';
import { createFollows } from './create-follows';
import { createItems } from './create-items';
import { createUsers } from './create-users';

export const createTestData = async () => {
  const {
    jack,
    kate,
    kevin,
    rebecca,
    user5,
    user6,
    user7,
    user8,
    user9,
    user10,
    user11,
  } = await createUsers();

  await createItems(
    jack,
    rebecca,
    kevin,
    kate,
    user5,
    user6,
    user7,
    user8,
    user9,
    user10,
    user11,
  );

  await createChat();

  await createFollows();
};
