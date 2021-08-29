import Value from '../models/value';

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
};

export default resolvers;
