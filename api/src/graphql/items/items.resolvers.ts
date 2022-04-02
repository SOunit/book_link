import { Op } from 'sequelize';
import Item from '../../models/sequelize/item';

export = {
  Query: {
    // FIXME: any type to something
    itemsByTitle: async (_: any, args: any) => {
      const titleQuery = args.title;

      const items = await Item.findAll({
        where: { title: { [Op.iLike]: `${titleQuery}%` } },
        limit: 10,
      });

      const itemList = items.map((elm: any) => {
        return {
          id: elm.id,
          title: elm.title,
          author: elm.author,
          imageUrl: elm.imageUrl,
        };
      });

      return itemList;
    },
  },
};
