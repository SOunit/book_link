import { v4 as uuidv4 } from 'uuid';
import { Op, QueryTypes } from 'sequelize';
import CreateItemInput from '../models/ts/CreateItemInput';
import Value from '../models/sequelize/value';
import Item from '../models/sequelize/item';
import UserType from '../models/ts/User';
import sequelize from '../util/database';

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
    const fetchedUsers = await sequelize.query(
      `select
        id
        , name
        , about
        from
        (
        select
        "userId"
        , count("itemId")
        from "userItems"
        where
        "itemId" in (:itemIds)
        group by "userItems"."userId"
        having count("itemId") = :itemIdsLength
        ) as "targetUsers"
        join users
        on users.id = "targetUsers"."userId"
        `,
      {
        replacements: { itemIds: args.ids, itemIdsLength: args.ids.length },
        type: QueryTypes.SELECT,
      }
    );

    const users: UserType[] = [];
    fetchedUsers.map((fetchedUser: UserType) => {
      users.push(fetchedUser);
    });

    return users;
  },
};

export default resolvers;
