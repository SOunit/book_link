import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';
import CreateItemInput from '../models/ts/CreateItemInput';
import Value from '../models/sequelize/value';
import Item from '../models/sequelize/item';
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

    const users: UserType[] = [];

    const fetchedItems = await Item.findAll({
      where: { id: { [Op.in]: args.ids } },
      include: User,
    });
    fetchedItems.map((fetchedItem: any) => {
      const fetchedUsers = fetchedItem.users;
      fetchedUsers.map((fetchedUser: any) => {
        const data = fetchedUser.dataValues;

        // push item if user id is new
        if (!users.some((user) => user.id === data.id)) {
          users.push({ id: data.id, name: data.name, about: data.about });
        }
      });
    });

    return users;
  },
};

export default resolvers;
