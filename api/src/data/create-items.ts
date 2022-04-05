import { UserItem, Item } from '../models/sequelize';

export const createItems = async () => {
  // items
  await Item.create({
    id: '10',
    title: 'Majo',
    author: 'Igarashi Daisuke',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/518NRzHLRUL._SX349_BO1,204,203,200_.jpg',
  });

  await Item.create({
    id: '11',
    title: 'APOSIMZ',
    author: 'TSUTOMU NIHEI',
    imageUrl:
      'https://image-upload-sample-blog-app-123.s3.ca-central-1.amazonaws.com/test_user_id/APOSIMZ.jpeg',
  });

  await Item.create({
    id: '12',
    title: 'Castle in the sky',
    author: 'Hayao Miyazaki',
    imageUrl:
      'https://image-upload-sample-blog-app-123.s3.ca-central-1.amazonaws.com/test_user_id/Castle_in_the_Sky.jpg',
  });

  await Item.create({
    id: '13',
    title: 'Fullmetal Alchemistt',
    author: 'Hiromu Arakawa',
    imageUrl:
      'https://image-upload-sample-blog-app-123.s3.ca-central-1.amazonaws.com/test_user_id/Fullmetal+_Alchemistt.jpeg',
  });

  await Item.create({
    id: '14',
    title: 'Emma',
    author: 'Kaoru Mori',
    imageUrl:
      'https://image-upload-sample-blog-app-123.s3.ca-central-1.amazonaws.com/test_user_id/emma.jpeg',
  });

  await Item.create({
    id: '15',
    title: 'GANTZ',
    author: 'HIROYA OKU',
    imageUrl:
      'https://image-upload-sample-blog-app-123.s3.ca-central-1.amazonaws.com/test_user_id/gantz.jpeg',
  });

  await Item.create({
    id: '16',
    title: 'Vagabond',
    author: 'Takehiko Inoue',
    imageUrl:
      'https://image-upload-sample-blog-app-123.s3.ca-central-1.amazonaws.com/test_user_id/vagabond.jpeg',
  });

  await Item.create({
    id: '20',
    title: 'Majo2',
    author: `Igarashi Daisuke`,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/71gDhFdvIcL.jpg',
  });

  await Item.create({
    id: '30',
    title: 'Kunitori Monogatari',
    author: 'Ryotaro Shiba',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/511LCOghq2L.jpg',
  });

  await Item.create({
    id: '40',
    title: 'Zatch Bell!',
    author: 'Makoto Raiku',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/51ux4gmFUCL.jpg',
  });

  await Item.create({
    id: '50',
    title: 'Dorohedoro',
    author: `Q Hayashida`,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/81hJWZiZheL.jpg',
  });

  await Item.create({
    id: '60',
    title: 'Atom the Beginning',
    author: `Tetsuro Kasahara`,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/91oqiYYAUpL.jpg',
  });

  await Item.create({
    id: '70',
    title: 'HISTORIĒ',
    author: `Iwaaki Hitoshi`,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/51RCfblrEjL.jpg',
  });

  await Item.create({
    id: '80',
    title: 'Attack on Titan',
    author: `Hajime Isayama`,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/A1uSJx8pG-S.jpg',
  });

  await Item.create({
    id: '90',
    title: 'Steve Jobs',
    author: `Mari Yamazaki`,
    imageUrl: 'https://m.media-amazon.com/images/I/516w7mS6LKL.jpg',
  });

  await Item.create({
    id: '91',
    title: 'Bataashi Kingyo',
    author: `Minetaro Mochizuki`,
    imageUrl: 'https://decadeview.ocnk.net/data/decadeview/product/1030-1.jpg',
  });

  await Item.create({
    id: '92',
    title: 'Tobu ga Gotoku',
    author: `Ryotaro Shiba`,
    imageUrl: 'https://m.media-amazon.com/images/I/41lVVfWe06L.jpg',
  });

  await Item.create({
    id: '93',
    title: 'RYOMA！',
    author: `Ryotaro Shiba`,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/41HMEAKYQXL.jpg',
  });

  await Item.create({
    id: '94',
    title: 'Taikoki',
    author: `Ryotaro Shiba`,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/61myrbUC70L._SX360_BO1,204,203,200_.jpg',
  });

  await Item.create({
    id: '95',
    title: 'One Child',
    author: `Torey L. Hayden`,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/61PUPRhrFcS.jpg',
  });

  await Item.create({
    id: '96',
    title: "Tiger's child",
    author: `Torey L. Hayden`,
    imageUrl:
      'https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781439107188/tigers-child-9781439107188_hr.jpg',
  });

  await Item.create({
    id: '97',
    title: 'Beautiful child',
    author: `Torey L. Hayden`,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/61RBtK1SP0L.jpg',
  });

  // id dose not exist error
  // should i add id?
  // https://stackoverflow.com/questions/29233896/sequelize-table-without-column-id

  await UserItem.create({
    UserId: '1',
    ItemId: '10',
  });

  await UserItem.create({
    UserId: '1',
    ItemId: '20',
  });

  await UserItem.create({
    UserId: '2',
    ItemId: '30',
  });

  await UserItem.create({
    UserId: '2',
    ItemId: '40',
  });

  await UserItem.create({
    UserId: '3',
    ItemId: '50',
  });

  await UserItem.create({
    UserId: '3',
    ItemId: '60',
  });

  await UserItem.create({
    UserId: '4',
    ItemId: '70',
  });

  await UserItem.create({
    UserId: '4',
    ItemId: '80',
  });

  await UserItem.create({
    UserId: '5',
    ItemId: '11',
  });
  await UserItem.create({
    UserId: '5',
    ItemId: '12',
  });

  await UserItem.create({
    UserId: '6',
    ItemId: '13',
  });
  await UserItem.create({
    UserId: '6',
    ItemId: '14',
  });

  await UserItem.create({
    UserId: '7',
    ItemId: '15',
  });
  await UserItem.create({
    UserId: '7',
    ItemId: '16',
  });

  await UserItem.create({
    UserId: '8',
    ItemId: '10',
  });
  await UserItem.create({
    UserId: '8',
    ItemId: '11',
  });

  await UserItem.create({
    UserId: '9',
    ItemId: '12',
  });
  await UserItem.create({
    UserId: '9',
    ItemId: '13',
  });

  await UserItem.create({
    UserId: '10',
    ItemId: '14',
  });
  await UserItem.create({
    UserId: '10',
    ItemId: '15',
  });

  await UserItem.create({
    UserId: '11',
    ItemId: '16',
  });
  await UserItem.create({
    UserId: '11',
    ItemId: '20',
  });

  await UserItem.create({
    UserId: '12',
    ItemId: '90',
  });

  await UserItem.create({
    UserId: '12',
    ItemId: '91',
  });

  await UserItem.create({
    UserId: '13',
    ItemId: '92',
  });

  await UserItem.create({
    UserId: '13',
    ItemId: '93',
  });

  await UserItem.create({
    UserId: '14',
    ItemId: '94',
  });
  await UserItem.create({
    UserId: '14',
    ItemId: '95',
  });

  await UserItem.create({
    UserId: '15',
    ItemId: '96',
  });
  await UserItem.create({
    UserId: '15',
    ItemId: '97',
  });

  await UserItem.create({
    UserId: '16',
    ItemId: '10',
  });
  await UserItem.create({
    UserId: '16',
    ItemId: '11',
  });

  await UserItem.create({
    UserId: '17',
    ItemId: '12',
  });
  await UserItem.create({
    UserId: '17',
    ItemId: '13',
  });

  await UserItem.create({
    UserId: '18',
    ItemId: '14',
  });
  await UserItem.create({
    UserId: '18',
    ItemId: '15',
  });

  await UserItem.create({
    UserId: '19',
    ItemId: '16',
  });
  await UserItem.create({
    UserId: '19',
    ItemId: '20',
  });

  await UserItem.create({
    UserId: '20',
    ItemId: '30',
  });
  await UserItem.create({
    UserId: '20',
    ItemId: '40',
  });

  await UserItem.create({
    UserId: '20',
    ItemId: '50',
  });
  await UserItem.create({
    UserId: '20',
    ItemId: '60',
  });

  await UserItem.create({
    UserId: '21',
    ItemId: '70',
  });
  await UserItem.create({
    UserId: '21',
    ItemId: '80',
  });

  await UserItem.create({
    UserId: '22',
    ItemId: '90',
  });
  await UserItem.create({
    UserId: '22',
    ItemId: '91',
  });

  await UserItem.create({
    UserId: '23',
    ItemId: '92',
  });
  await UserItem.create({
    UserId: '23',
    ItemId: '93',
  });

  await UserItem.create({
    UserId: '24',
    ItemId: '94',
  });
  await UserItem.create({
    UserId: '24',
    ItemId: '95',
  });
};
