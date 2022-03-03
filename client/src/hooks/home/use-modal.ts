import { useState } from 'react';

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const modalOpenHandler = () => {
    setIsModalOpen(true);
  };
  const modalCloseHandler = () => {
    setIsModalOpen(false);
  };
  return {
    isModalOpen,
    modalOpenHandler,
    modalCloseHandler,
  };
};

export default useModal;
