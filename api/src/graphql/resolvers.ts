import Value from '../models/value';

const resolvers = {
  values: async () => {
    const result = await Value.fetchAll();

    const values: number[] = [];
    result.rows.map((obj) => {
      values.push(obj.number);
    });

    return values;
  },

  createValue: async (value: { value: number }) => {
    const newValue = new Value(value.value);
    await newValue.save();
    return newValue.number;
  },
};

export default resolvers;
