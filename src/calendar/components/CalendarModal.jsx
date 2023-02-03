import { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
Modal.setAppElement('#root');
export const CalendarModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const onCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <Modal
      className='modal'
      overlayClassName='modal-fondo'
      closeTimeoutMS={200}
      isOpen={isModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      contentLabel='Example Modal'>
      <h1>Hola</h1>
    </Modal>
  );
};
