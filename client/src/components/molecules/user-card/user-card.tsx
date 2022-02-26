import { FC } from 'react';
import { User } from '../../../models';
import { Image } from '../../atoms';
import classes from './user-card.module.css';

type Props = {
  user: User;
  className?: string;
  actions?: any;
};

export const UserCard: FC<Props> = ({ user, className, actions }) => {
  return (
    <div className={`${classes['user-card']} ${className}`}>
      <Image
        src={user.imageUrl}
        alt={user.name}
        className={classes['user-image']}
        imageStyle={classes['user-image__image--round']}
      />
      <p>{user.name}</p>
      <div className={classes['actions']}>{actions}</div>
    </div>
  );
};
