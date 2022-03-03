import { FC } from 'react';
import classes from './image.module.css';

type Props = {
  src: string;
  alt: string;
  className?: string;
  imageStyle?: string;
};

export const Image: FC<Props> = ({ src, alt, className, imageStyle }) => {
  return (
    <div className={`${classes['image-container']} ${className}`}>
      {src ? (
        <img
          className={`${classes['image']} ${imageStyle}`}
          src={src}
          alt={alt}
        />
      ) : (
        <div className={`${classes['image']} ${classes['image--no-image']}`}>
          <p>No Image</p>
        </div>
      )}
    </div>
  );
};
