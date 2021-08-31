import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';
import CreateItemInput from '../models/ts/CreateItemInput';
import Value from '../models/sequelize/value';
import Item from '../models/sequelize/item';
import UserItem from '../models/sequelize/userItem';
import User from '../models/sequelize/user';
import UserType from '../models/ts/User';

const resolvers = {
  values: async () => {
    const result = await Value.findAll();

    const values: number[] = [];
    result.map((obj: { number: number }) => {
      values.push(obj.number);
    });

    return values;
  },

  createValue: async (args: { value: number }) => {
    await Value.create({
      number: args.value,
    });

    return 200;
  },

  // FIXME: any type to something
  items: async (args: any, req: any) => {
    const titleQuery = args.title;

    const result = await Item.findAll({
      where: { title: { [Op.iLike]: `${titleQuery}%` } },
    });

    return result;
  },

  createItem: async (args: { data: CreateItemInput }) => {
    const id = uuidv4();
    const { title, author, imageUrl } = args.data;
    const newItem = { id, title, author, imageUrl };

    await Item.create(newItem);

    return newItem;
  },

  getUsersByItems: async (args: { ids: String[] }) => {
    console.log(args.ids);

    const userIds: String[] = [];
    const users: UserType[] = [];

    const fetchedUserItems = await UserItem.findAll({
      where: { itemId: { [Op.in]: args.ids } },
    });
    fetchedUserItems.map((fetchedUserItem: any) => {
      userIds.push(fetchedUserItem.userId);
    });

    const fetchedUsers = await User.findAll({
      where: { id: { [Op.in]: userIds } },
    });
    // console.log(fetchedUsers);
    fetchedUsers.map((fetchedUser: any) => {
      const data = fetchedUser.dataValues;
      console.log(data);
      users.push({ id: data.id, name: data.name, about: data.about });
    });

    return users;
  },
};

export default resolvers;
