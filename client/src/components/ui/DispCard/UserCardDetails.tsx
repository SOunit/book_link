import Buttons from '../Buttons/Buttons';
import Button, { ButtonTypes } from '../Buttons/Button';
import { Fragment } from 'react';

const UserCardDetails = () => {
  return (
    <Fragment>
      <Buttons>
        <Button
          buttonText={'Detail'}
          buttonType={ButtonTypes.NORMAL}
          onButtonClick={() => {}}
        />
      </Buttons>
    </Fragment>
  );
};

export default UserCardDetails;
