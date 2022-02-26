import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { Image } from '../../atoms';
import classes from './edit-prof-image.module.css';

type Props = {
  image?: File;
  userImageUrl: string;
  setImage: any;
};

export const EditProfImage: FC<Props> = ({ image, userImageUrl, setImage }) => {
  const imagePickerRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>();

  const fileSelectedHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (
      event.target.files &&
      event.target.files[0].type.substring(0, 5) === 'image'
    ) {
      console.log(event.target.files[0]);
      setImage(event.target.files[0]);
    }
  };

  const imageClickHandler = () => {
    imagePickerRef.current?.click();
  };

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(image);
    }
  }, [image]);

  return (
    <div className={classes['edit-prof-image']} onClick={imageClickHandler}>
      <input
        className={classes['edit-prof-image__image-picker']}
        type="file"
        onChange={fileSelectedHandler}
        ref={imagePickerRef}
        accept="image/*"
      />
      <Image
        src={preview ? preview : userImageUrl}
        alt="preview"
        imageStyle={classes['edit-prof-image__image']}
      />
      <p>Update</p>
    </div>
  );
};
