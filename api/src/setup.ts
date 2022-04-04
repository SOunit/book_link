import {
  Chat,
  Follow,
  Message,
  User,
  UserItem,
  UserChat,
} from './models/sequelize';

export const setupDummyData = async () => {
  // users
  const jack: any = await User.create({
    id: '1',
    name: 'Jack',
    about: `I am a test user! You can edit whatever you want, but All changes will be gone. because every deploy create new records!`,
    imageUrl:
      'https://image-upload-sample-blog-app-123.s3.ca-central-1.amazonaws.com/test_user_id/vicky-hladynets-C8Ta0gwPbQg-unsplash.jpg',
  });

  console.log('jack', jack);
  console.log('jack.createItem', jack.createItem);

  const rebecca = await User.create({
    id: '2',
    name: 'Rebecca',
    about: `Lorem ipsum dolor, sit.
               ex sint sit fuga doloribus minima,
              repudiandae molestiae voluptate? Minima tenetur quos rem nulla quo
              praesentium libero reiciendis quam!`,
    imageUrl:
      'https://image-upload-sample-blog-app-123.s3.ca-central-1.amazonaws.com/test_user_id/houcine-ncib-B4TjXnI0Y2c-unsplash.jpg',
  });

  const kevin = await User.create({
    id: '3',
    name: 'Kevin',
    about: ``,
    imageUrl:
      'https://image-upload-sample-blog-app-123.s3.ca-central-1.amazonaws.com/test_user_id/craig-mckay-jmURdhtm7Ng-unsplash.jpg',
  });

  const kate = await User.create({
    id: '4',
    name: 'Kate',
    about: `Lorem ipsum dolor sit. A
              asperiores autem voluptatum nostrum provident voluptas, corrupti
              animi quas! Temporibus error harum nam sapiente totam maiores non
              vitae impedit recusandae aut.`,
    imageUrl:
      'https://image-upload-sample-blog-app-123.s3.ca-central-1.amazonaws.com/test_user_id/troy-wade-ncfTHzTjtCw-unsplash.jpg',
  });

  const user5 = await User.create({
    id: '5',
    name: 'Randal',
    about: `Lorem ipsum dolor sit. A
     nostrum provident voluptas, corrupti
    animi quas! Temporibus error harum nam sapiente totam maiores non
    vitae impedit recusandae aut.`,
    imageUrl:
      'https://image-upload-sample-blog-app-123.s3.ca-central-1.amazonaws.com/test_user_id/karina-tess-l35dDPD3Gys-unsplash.jpeg',
  });

  const user6 = await User.create({
    id: '6',
    name: 'Jeffery',
    about: `Lorem ipsum dolor sit. A
     nostrum provident voluptas, corrupti
    animi quas! Temporibus error harum nam sapiente totam maiores non
    vitae impedit recusandae aut.`,
    imageUrl:
      'https://image-upload-sample-blog-app-123.s3.ca-central-1.amazonaws.com/test_user_id/jeffery-erhunse-Z9lbmEjyYjU-unsplash.jpeg',
  });

  const user7 = await User.create({
    id: '7',
    name: 'Irene',
    about: `Lorem ipsum dolor sit. A
     nostrum provident voluptas, corrupti
    animi quas! Temporibus error harum nam sapiente totam maiores non
    vitae impedit recusandae aut.`,
    imageUrl:
      'https://image-upload-sample-blog-app-123.s3.ca-central-1.amazonaws.com/test_user_id/irene-strong-v2aKnjMbP_k-unsplash.jpeg',
  });

  const user8 = await User.create({
    id: '8',
    name: 'Iron',
    about: `Lorem ipsum dolor sit. A
     nostrum provident voluptas, corrupti
    animi quas! Temporibus error harum nam sapiente totam maiores non
    vitae impedit recusandae aut.`,
    imageUrl:
      'https://image-upload-sample-blog-app-123.s3.ca-central-1.amazonaws.com/test_user_id/ionut-comanici-RDcEWH5hSDE-unsplash.jpeg',
  });

  const user9 = await User.create({
    id: '9',
    name: 'Gabriel',
    about: `Lorem ipsum dolor sit. A
     nostrum provident voluptas, corrupti
    animi quas! Temporibus error harum nam sapiente totam maiores non
    vitae impedit recusandae aut.`,
    imageUrl:
      'https://image-upload-sample-blog-app-123.s3.ca-central-1.amazonaws.com/test_user_id/gabriel-silverio-K_b41GaWC5Y-unsplash.jpeg',
  });

  const user10 = await User.create({
    id: '10',
    name: 'Ehsan',
    about: `Lorem ipsum dolor sit. A
     nostrum provident voluptas, corrupti
    animi quas! Temporibus error harum nam sapiente totam maiores non
    vitae impedit recusandae aut.`,
    imageUrl:
      'https://image-upload-sample-blog-app-123.s3.ca-central-1.amazonaws.com/test_user_id/ehsan-ahmadi-vsWy6nchcOs-unsplash.jpeg',
  });

  const user11 = await User.create({
    id: '11',
    name: 'Dave',
    about: `Lorem ipsum dolor sit. A
     nostrum provident voluptas, corrupti
    animi quas! Temporibus error harum nam sapiente totam maiores non
    vitae impedit recusandae aut.`,
    imageUrl:
      'https://image-upload-sample-blog-app-123.s3.ca-central-1.amazonaws.com/test_user_id/dave-goudreau-MJ2zd_OfxSw-unsplash.jpeg',
  });

  const user12 = await User.create({
    id: '12',
    name: 'Clive',
    about: `Lorem ipsum dolor sit. A
     nostrum provident voluptas, corrupti
    animi quas! Temporibus error harum nam sapiente totam maiores non
    vitae impedit recusandae aut.`,
    imageUrl:
      'https://image-upload-sample-blog-app-123.s3.ca-central-1.amazonaws.com/test_user_id/clive-surreal-9kQBQqY_xrk-unsplash.jpeg',
  });

  const user13 = await User.create({
    id: '13',
    name: 'Christina',
    about: `Lorem ipsum dolor sit. A
     nostrum provident voluptas, corrupti
    animi quas! Temporibus error harum nam sapiente totam maiores non
    vitae impedit recusandae aut.`,
    imageUrl:
      'https://image-upload-sample-blog-app-123.s3.ca-central-1.amazonaws.com/test_user_id/christina-wocintechchat-com-0Zx1bDv5BNY-unsplash.jpeg',
  });

  const user14 = await User.create({
    id: '14',
    name: 'Buehner',
    about: `Lorem ipsum dolor sit. A
     nostrum provident voluptas, corrupti
    animi quas! Temporibus error harum nam sapiente totam maiores non
    vitae impedit recusandae aut.`,
    imageUrl:
      'https://image-upload-sample-blog-app-123.s3.ca-central-1.amazonaws.com/test_user_id/christian-buehner-DItYlc26zVI-unsplash.jpeg',
  });

  const user15 = await User.create({
    id: '15',
    name: 'Leilani',
    about: `Lorem ipsum dolor sit. A
     nostrum provident voluptas, corrupti
    animi quas! Temporibus error harum nam sapiente totam maiores non
    vitae impedit recusandae aut.`,
    imageUrl:
      'https://image-upload-sample-blog-app-123.s3.ca-central-1.amazonaws.com/test_user_id/leilani-angel-K84vnnzxmTQ-unsplash.jpeg',
  });

  const user16 = await User.create({
    id: '16',
    name: 'Michael',
    about: `Lorem ipsum dolor sit. A
     nostrum provident voluptas, corrupti
    animi quas! Temporibus error harum nam sapiente totam maiores non
    vitae impedit recusandae aut.`,
    imageUrl:
      'https://image-upload-sample-blog-app-123.s3.ca-central-1.amazonaws.com/test_user_id/michael-dam-mEZ3PoFGs_k-unsplash.jpeg',
  });

  const user17 = await User.create({
    id: '17',
    name: 'Nishanth',
    about: `Lorem ipsum dolor sit. A
     nostrum provident voluptas, corrupti
    animi quas! Temporibus error harum nam sapiente totam maiores non
    vitae impedit recusandae aut.`,
    imageUrl:
      'https://image-upload-sample-blog-app-123.s3.ca-central-1.amazonaws.com/test_user_id/nishanth-avva-SdCaK9YKdwk-unsplash.jpeg',
  });

  const user18 = await User.create({
    id: '18',
    name: 'Philip',
    about: `Lorem ipsum dolor sit. A
     nostrum provident voluptas, corrupti
    animi quas! Temporibus error harum nam sapiente totam maiores non
    vitae impedit recusandae aut.`,
    imageUrl:
      'https://image-upload-sample-blog-app-123.s3.ca-central-1.amazonaws.com/test_user_id/philip-martin-5aGUyCW_PJw-unsplash.jpeg',
  });

  const user19 = await User.create({
    id: '19',
    name: 'Akachi',
    about: `Lorem ipsum dolor sit. A
     nostrum provident voluptas, corrupti
    animi quas! Temporibus error harum nam sapiente totam maiores non
    vitae impedit recusandae aut.`,
    imageUrl:
      'https://image-upload-sample-blog-app-123.s3.ca-central-1.amazonaws.com/test_user_id/prince-akachi-LWkFHEGpleE-unsplash.jpeg',
  });

  const user20 = await User.create({
    id: '20',
    name: 'Rana',
    about: `Lorem ipsum dolor sit. A
     nostrum provident voluptas, corrupti
    animi quas! Temporibus error harum nam sapiente totam maiores non
    vitae impedit recusandae aut.`,
    imageUrl:
      'https://image-upload-sample-blog-app-123.s3.ca-central-1.amazonaws.com/test_user_id/raj-rana-15Vb4B_ma_s-unsplash.jpeg',
  });

  const user21 = await User.create({
    id: '21',
    name: 'Ransford',
    about: `Lorem ipsum dolor sit. A
     nostrum provident voluptas, corrupti
    animi quas! Temporibus error harum nam sapiente totam maiores non
    vitae impedit recusandae aut.`,
    imageUrl:
      'https://image-upload-sample-blog-app-123.s3.ca-central-1.amazonaws.com/test_user_id/ransford-quaye-DzAFv1iVMGg-unsplash.jpeg',
  });

  const user22 = await User.create({
    id: '22',
    name: 'Roksolana',
    about: `Lorem ipsum dolor sit. A
     nostrum provident voluptas, corrupti
    animi quas! Temporibus error harum nam sapiente totam maiores non
    vitae impedit recusandae aut.`,
    imageUrl:
      'https://image-upload-sample-blog-app-123.s3.ca-central-1.amazonaws.com/test_user_id/roksolana-zasiadko-LyeduBb2Auk-unsplash.jpeg',
  });

  const user23 = await User.create({
    id: '23',
    name: 'Stephanie',
    about: `Lorem ipsum dolor sit. A
     nostrum provident voluptas, corrupti
    animi quas! Temporibus error harum nam sapiente totam maiores non
    vitae impedit recusandae aut.`,
    imageUrl:
      'https://image-upload-sample-blog-app-123.s3.ca-central-1.amazonaws.com/test_user_id/stephanie-liverani-Zz5LQe-VSMY-unsplash.jpeg',
  });

  const user24 = await User.create({
    id: '24',
    name: 'Yunming',
    about: `Lorem ipsum dolor sit. A
     nostrum provident voluptas, corrupti
    animi quas! Temporibus error harum nam sapiente totam maiores non
    vitae impedit recusandae aut.`,
    imageUrl:
      'https://image-upload-sample-blog-app-123.s3.ca-central-1.amazonaws.com/test_user_id/yunming-wang-G9f4Enb8XVM-unsplash.jpeg',
  });

  // items
  await (jack as any).createItem({
    id: '10',
    title: 'Majo',
    author: 'Igarashi Daisuke',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/518NRzHLRUL._SX349_BO1,204,203,200_.jpg',
  });

  await (jack as any).createItem({
    id: '20',
    title: 'Majo2',
    author: `Igarashi Daisuke`,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/71gDhFdvIcL.jpg',
  });

  await (rebecca as any).createItem({
    id: '50',
    title: 'Dorohedoro',
    author: `Q Hayashida`,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/81hJWZiZheL.jpg',
  });

  await (rebecca as any).createItem({
    id: '60',
    title: 'Atom the Beginning',
    author: `Tetsuro Kasahara`,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/91oqiYYAUpL.jpg',
  });

  await (kevin as any).createItem({
    id: '70',
    title: 'HISTORIĒ',
    author: `Iwaaki Hitoshi`,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/51RCfblrEjL.jpg',
  });

  await (kevin as any).createItem({
    id: '80',
    title: 'Attack on Titan',
    author: `Hajime Isayama`,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/A1uSJx8pG-S.jpg',
  });

  await (kate as any).createItem({
    id: '90',
    title: 'Steve Jobs',
    author: `Mari Yamazaki`,
    imageUrl: 'https://m.media-amazon.com/images/I/516w7mS6LKL.jpg',
  });

  await (kate as any).createItem({
    id: '91',
    title: 'Bataashi Kingyo',
    author: `Minetaro Mochizuki`,
    imageUrl: 'https://decadeview.ocnk.net/data/decadeview/product/1030-1.jpg',
  });

  await (user5 as any).createItem({
    id: '92',
    title: 'Tobu ga Gotoku',
    author: `Ryotaro Shiba`,
    imageUrl: 'https://m.media-amazon.com/images/I/41lVVfWe06L.jpg',
  });

  await (user5 as any).createItem({
    id: '93',
    title: 'RYOMA！',
    author: `Ryotaro Shiba`,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/41HMEAKYQXL.jpg',
  });

  await (user6 as any).createItem({
    id: '94',
    title: 'Taikoki',
    author: `Ryotaro Shiba`,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/61myrbUC70L._SX360_BO1,204,203,200_.jpg',
  });

  await (user6 as any).createItem({
    id: '95',
    title: 'One Child',
    author: `Torey L. Hayden`,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/61PUPRhrFcS.jpg',
  });

  await (user7 as any).createItem({
    id: '96',
    title: "Tiger's child",
    author: `Torey L. Hayden`,
    imageUrl:
      'https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781439107188/tigers-child-9781439107188_hr.jpg',
  });

  await (user7 as any).createItem({
    id: '97',
    title: 'Beautiful child',
    author: `Torey L. Hayden`,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/61RBtK1SP0L.jpg',
  });

  await (user8 as any).createItem({
    id: '30',
    title: 'Kunitori Monogatari',
    author: 'Ryotaro Shiba',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/511LCOghq2L.jpg',
  });

  await (user8 as any).createItem({
    id: '40',
    title: 'Zatch Bell!',
    author: 'Makoto Raiku',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/51ux4gmFUCL.jpg',
  });

  await (user9 as any).createItem({
    id: '11',
    title: 'APOSIMZ',
    author: 'TSUTOMU NIHEI',
    imageUrl:
      'https://image-upload-sample-blog-app-123.s3.ca-central-1.amazonaws.com/test_user_id/APOSIMZ.jpeg',
  });

  await (user9 as any).createItem({
    id: '12',
    title: 'Castle in the sky',
    author: 'Hayao Miyazaki',
    imageUrl:
      'https://image-upload-sample-blog-app-123.s3.ca-central-1.amazonaws.com/test_user_id/Castle_in_the_Sky.jpg',
  });

  await (user10 as any).createItem({
    id: '13',
    title: 'Fullmetal Alchemistt',
    author: 'Hiromu Arakawa',
    imageUrl:
      'https://image-upload-sample-blog-app-123.s3.ca-central-1.amazonaws.com/test_user_id/Fullmetal+_Alchemistt.jpeg',
  });

  await (user10 as any).createItem({
    id: '14',
    title: 'Emma',
    author: 'Kaoru Mori',
    imageUrl:
      'https://image-upload-sample-blog-app-123.s3.ca-central-1.amazonaws.com/test_user_id/emma.jpeg',
  });

  await (user11 as any).createItem({
    id: '15',
    title: 'GANTZ',
    author: 'HIROYA OKU',
    imageUrl:
      'https://image-upload-sample-blog-app-123.s3.ca-central-1.amazonaws.com/test_user_id/gantz.jpeg',
  });

  await (user11 as any).createItem({
    id: '16',
    title: 'Vagabond',
    author: 'Takehiko Inoue',
    imageUrl:
      'https://image-upload-sample-blog-app-123.s3.ca-central-1.amazonaws.com/test_user_id/vagabond.jpeg',
  });

  // user1-11 create
  // 10-16
  // 20,30,40,50,60,70,80,90
  // 91-97

  // user12-24 connect

  await UserItem.create({
    userId: '12',
    itemId: '90',
  });

  await UserItem.create({
    userId: '12',
    itemId: '91',
  });

  await UserItem.create({
    userId: '13',
    itemId: '92',
  });

  await UserItem.create({
    userId: '13',
    itemId: '93',
  });

  await UserItem.create({
    userId: '14',
    itemId: '94',
  });
  await UserItem.create({
    userId: '14',
    itemId: '95',
  });

  await UserItem.create({
    userId: '15',
    itemId: '96',
  });
  await UserItem.create({
    userId: '15',
    itemId: '97',
  });

  await UserItem.create({
    userId: '16',
    itemId: '10',
  });
  await UserItem.create({
    userId: '16',
    itemId: '11',
  });

  await UserItem.create({
    userId: '17',
    itemId: '12',
  });
  await UserItem.create({
    userId: '17',
    itemId: '13',
  });

  await UserItem.create({
    userId: '18',
    itemId: '14',
  });
  await UserItem.create({
    userId: '18',
    itemId: '15',
  });

  await UserItem.create({
    userId: '19',
    itemId: '16',
  });
  await UserItem.create({
    userId: '19',
    itemId: '20',
  });

  await UserItem.create({
    userId: '20',
    itemId: '30',
  });
  await UserItem.create({
    userId: '20',
    itemId: '40',
  });

  await UserItem.create({
    userId: '20',
    itemId: '50',
  });
  await UserItem.create({
    userId: '20',
    itemId: '60',
  });

  await UserItem.create({
    userId: '21',
    itemId: '70',
  });
  await UserItem.create({
    userId: '21',
    itemId: '80',
  });

  await UserItem.create({
    userId: '22',
    itemId: '90',
  });
  await UserItem.create({
    userId: '22',
    itemId: '91',
  });

  await UserItem.create({
    userId: '23',
    itemId: '92',
  });
  await UserItem.create({
    userId: '23',
    itemId: '93',
  });

  await UserItem.create({
    userId: '24',
    itemId: '94',
  });
  await UserItem.create({
    userId: '24',
    itemId: '95',
  });

  await Chat.create({
    id: '1',
  });
  await UserChat.create({
    userId: '1',
    chatId: '1',
  });
  await UserChat.create({
    userId: '2',
    chatId: '1',
  });
  await Message.create({
    id: '1',
    chatId: '1',
    userId: '1',
    text: 'test message from user 1',
  });
  await Message.create({
    id: '2',
    chatId: '1',
    userId: '2',
    text: 'test message from user 2',
  });
  await Message.create({
    id: '7',
    chatId: '1',
    userId: '1',
    text: 'user1!!! Lorem ipsum dolor sit. Mollitia voluptate illum provident alias eius quam quod dolor nobis tenetur aperiam, voluptates nesciunt debitis at molestiae ex cum? Aspernatur, porro est?',
  });
  await Message.create({
    id: '8',
    chatId: '1',
    userId: '2',
    text: 'user2!!! Lorem ipsum dolor, sit. Perferendis quis atque, voluptas enim dolorem optio quos minima ad facere sunt voluptatem cupiditate excepturi aliquid quibusdam cumque nobis mollitia blanditiis corrupti!',
  });
  await Message.create({
    id: '9',
    chatId: '1',
    userId: '2',
    text: 'how are you?',
  });

  // follow data
  await Follow.create({
    userId: '1',
    followingUserId: '4',
  });

  await Follow.create({
    userId: '2',
    followingUserId: '4',
  });

  await Follow.create({
    userId: '2',
    followingUserId: '1',
  });

  await Follow.create({
    userId: '3',
    followingUserId: '1',
  });

  await Follow.create({
    userId: '4',
    followingUserId: '5',
  });

  await Follow.create({
    userId: '5',
    followingUserId: '6',
  });
  await Follow.create({
    userId: '2',
    followingUserId: '6',
  });

  await Follow.create({
    userId: '6',
    followingUserId: '7',
  });

  await Follow.create({
    userId: '7',
    followingUserId: '8',
  });

  await Follow.create({
    userId: '9',
    followingUserId: '10',
  });

  await Follow.create({
    userId: '10',
    followingUserId: '11',
  });

  await Follow.create({
    userId: '12',
    followingUserId: '13',
  });

  await Follow.create({
    userId: '14',
    followingUserId: '15',
  });

  await Follow.create({
    userId: '16',
    followingUserId: '17',
  });

  await Follow.create({
    userId: '18',
    followingUserId: '19',
  });

  await Follow.create({
    userId: '20',
    followingUserId: '21',
  });

  await Follow.create({
    userId: '21',
    followingUserId: '22',
  });

  await Follow.create({
    userId: '23',
    followingUserId: '24',
  });

  // fetch user including chats, messages
  // User.findOne({
  //   where: { id: '1' },
  //   include: {
  //     model: Chat,
  //     include: [{ model: Message }],
  //   },
  // }).then((res: any) => {});
};
