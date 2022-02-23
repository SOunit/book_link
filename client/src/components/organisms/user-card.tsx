import { FC } from 'react';
import User from '../../models/User';
import Image from '../atoms/image';
import classes from './item-card.module.css';

type Props = {
  user: User;
  className?: string;
  actions?: any;
};

const UserCard: FC<Props> = ({ user, className, actions }) => {
  return (
    <div className={className}>
      <Image
        src={user.imageUrl}
        alt={user.name}
        className={classes['user-image']}
      />
      <div className={classes['actions']}>{actions}</div>
    </div>
  );
};

export default UserCard;
