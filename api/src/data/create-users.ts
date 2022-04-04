import { Chat, Follow, Message, User, UserChat } from '../models/sequelize';

export const createUsers = async () => {
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

  return {
    jack,
    rebecca,
    kevin,
    kate,
    user5,
    user6,
    user7,
    user8,
    user9,
    user10,
    user11,
  };

  // fetch user including chats, messages
  // User.findOne({
  //   where: { id: '1' },
  //   include: {
  //     model: Chat,
  //     include: [{ model: Message }],
  //   },
  // }).then((res: any) => {});
};
