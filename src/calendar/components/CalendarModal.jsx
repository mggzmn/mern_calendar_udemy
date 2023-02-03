import { useState } from 'react';

import { addHours } from 'date-fns';

import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
  const [formValues, setFormValues] = useState({
    title: 'Mi cumpleaños',
    notes: '',
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  const onInputChanged = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onDateChanged = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event,
    });
  };

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
      <h1> Nuevo evento </h1>
      <hr />
      <form className='container'>
        <div className='form-group mb-2'>
          <label>Fecha y hora inicio</label>
          <DatePicker
            selected={formValues.start}
            className='form-control'
            onChange={(e) => {
              onDateChanged(e, 'start');
            }}
            dateFormat='Pp'
          />
        </div>

        <div className='form-group mb-2'>
          <label>Fecha y hora fin</label>
          <DatePicker
            minDate={formValues.start}
            selected={formValues.end}
            className='form-control'
            onChange={(e) => {
              onDateChanged(e, 'end');
            }}
            dateFormat='Pp'
          />
        </div>

        <hr />
        <div className='form-group mb-2'>
          <label>Título y notas</label>
          <input
            type='text'
            className='form-control'
            value={formValues.title}
            onChange={onInputChanged}
            placeholder='Título del evento'
            name='title'
            autoComplete='off'
          />
          <small id='emailHelp' className='form-text text-muted'>
            Una descripción corta
          </small>
        </div>

        <div className='form-group mb-2'>
          <textarea
            type='text'
            className='form-control'
            value={formValues.notes}
            onChange={onInputChanged}
            placeholder='Notas'
            rows='5'
            name='notes'></textarea>
          <small id='emailHelp' className='form-text text-muted'>
            Información adicional
          </small>
        </div>

        <button type='submit' className='btn btn-outline-primary btn-block'>
          <i className='far fa-save'></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
