import { Follow } from '../models/sequelize';

export const createFollows = async () => {
  // follow data
  await Follow.create({
    UserId: '1',
    followingUserId: '2',
  });

  await Follow.create({
    UserId: '2',
    followingUserId: '4',
  });

  await Follow.create({
    UserId: '2',
    followingUserId: '1',
  });

  await Follow.create({
    UserId: '3',
    followingUserId: '1',
  });

  await Follow.create({
    UserId: '4',
    followingUserId: '5',
  });

  await Follow.create({
    UserId: '5',
    followingUserId: '6',
  });
  await Follow.create({
    UserId: '2',
    followingUserId: '6',
  });

  await Follow.create({
    UserId: '6',
    followingUserId: '7',
  });

  await Follow.create({
    UserId: '7',
    followingUserId: '8',
  });

  await Follow.create({
    UserId: '9',
    followingUserId: '10',
  });

  await Follow.create({
    UserId: '10',
    followingUserId: '11',
  });

  await Follow.create({
    UserId: '12',
    followingUserId: '13',
  });

  await Follow.create({
    UserId: '14',
    followingUserId: '15',
  });

  await Follow.create({
    UserId: '16',
    followingUserId: '17',
  });

  await Follow.create({
    UserId: '18',
    followingUserId: '19',
  });

  await Follow.create({
    UserId: '20',
    followingUserId: '21',
  });

  await Follow.create({
    UserId: '21',
    followingUserId: '22',
  });

  await Follow.create({
    UserId: '23',
    followingUserId: '24',
  });
};
