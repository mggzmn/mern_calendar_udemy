import { useDispatch, useSelector } from 'react-redux';
import { calendarApi } from '../api';
import { convertEventsToDate } from '../helpers';
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from '../store';


export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);
    const { user } = useSelector(state => state.auth);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async (calendarEvent) => {

        if (calendarEvent._id) {
            // Actualizando
            dispatch(onUpdateEvent({ ...calendarEvent }));
        } else {
            // Creando
            const { data } = await calendarApi.post('/events', calendarEvent);
            dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));
        }
    }

    const startDeletingEvent = () => {



        dispatch(onDeleteEvent());
    }
    const startLoadingEvents = async () => {
        try {
            const { data } = await calendarApi.get('/events');
            const events = convertEventsToDate(data.eventos);
            dispatch(onLoadEvents(events))
        } catch (error) {
            console.log(error)
        }
    }

    return {
        //* Propiedades
        activeEvent,
        events,
        hasEventSelected: !!activeEvent,

        //* Métodos
        startDeletingEvent,
        setActiveEvent,
        startSavingEvent,
        startLoadingEvents
    }
}