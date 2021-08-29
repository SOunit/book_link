import { v4 as uuidv4 } from 'uuid';
import CreateItemInput from '../models/ts/CreateItemInput';
import Value from '../models/sequelize/value';
import Item from '../models/sequelize/item';

const resolvers = {
  values: async () => {
    const result = await Value.findAll();
    console.log(result);

    const values: number[] = [];
    result.map((obj: { number: number }) => {
      values.push(obj.number);
    });

    return values;
  },

  createValue: async (value: { value: number }) => {
    const result = await Value.create({
      number: value.value,
    });

    console.log('result', result);

    return 200;
  },

  // FIXME: any type to something
  items: async (args: any, req: any) => {
    const titleQuery = args.title;
    console.log('items args', args);

    // FIXME: find where args
    const result = await Item.findAll();

    console.log('items result', result);

    return result;
  },

  createItem: async (data: { data: CreateItemInput }) => {
    const id = uuidv4();
    const { title, author } = data.data;
    const newItem = { id, title, author };

    await Item.create(newItem);

    return newItem;
  },
};

export default resolvers;
