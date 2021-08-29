import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';
import CreateItemInput from '../models/ts/CreateItemInput';
import Value from '../models/sequelize/value';
import Item from '../models/sequelize/item';

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
      where: { title: { [Op.substring]: titleQuery } },
    });

    return result;
  },

  createItem: async (args: { data: CreateItemInput }) => {
    const id = uuidv4();
    const { title, author } = args.data;
    const newItem = { id, title, author };

    await Item.create(newItem);

    return newItem;
  },
};

export default resolvers;
