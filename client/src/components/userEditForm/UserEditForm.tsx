import { FC } from 'react';

const UserEditForm: FC = () => {
  return (
    <form>
      <label htmlFor='name'>Name</label>
      <input type='text' id='name' />
      {/* FIXME: change image url to image file */}
      <label htmlFor='imageUrl'>Profile Image Url</label>
      <input type='text' id='imageUrl' />
      <label htmlFor='about'>About</label>
      <input type='text' id='about' />
    </form>
  );
};

export default UserEditForm;
