import { addHours } from 'date-fns';
import { useCalendarStore, useUiStore } from '../../hooks';
import { onSetActiveEvent } from '../../store';

export const FabAddNew = () => {
  const { openDateModal } = useUiStore();
  const { setActiveEvent } = useCalendarStore();
  const handleClickNew = () => {
    setActiveEvent({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours( new Date(), 2 ),
        bgColor: '#50327c',
        user: {
          _id: '123',
          name: 'Mariana'
        }
    })
    openDateModal();
  };
  return (
    <button className='btn btn-primary fab' onClick={handleClickNew}>
      <i className='fas fa-plus'></i>
    </button>
  );
};
