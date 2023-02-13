import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../../../src/store/calendar/calendarSlice";
import { calendarWithActiveEventsState, calendarWithEventsState, events, initialState } from "../../fixtures/calendarState";

describe('Pruebas en calendar Slice', () => {
    test('debe de regresar el estado por defecto', () => {
        const state = calendarSlice.getInitialState();
        expect(state).toEqual(initialState)
    });
    test('onSetActiveEvent debe activar el evento', () => {
        const state = calendarSlice.reducer(calendarWithEventsState, onSetActiveEvent(events[0]));
        expect(state.activeEvent).toEqual(events[0])
    });
    test('onAddNewEvent debe agregar el evento', () => {
        const newEvent = {
            id: '3',
            title: 'Cumpleaños del Jefe',
            notes: 'Hay que comprar el pastel',
            start: new Date('2023-10-21 13:00:00'),
            end: new Date('2023-10-21 15:00:00'),
        }
        const state = calendarSlice.reducer(calendarWithEventsState, onAddNewEvent(newEvent));
        expect(state.events).toEqual([...events, newEvent]);

    });
    test('onUpdateEvent debe actualizar el evento', () => {
        const newEvent = {
            id: '1',
            title: 'Cumpleaños de alguien',
            notes: 'Hay que comprar el pastel',
            start: new Date('2023-10-21 13:00:00'),
            end: new Date('2023-10-21 15:00:00'),
        }
        const state = calendarSlice.reducer(calendarWithEventsState, onUpdateEvent(newEvent));
        expect(state.events).toContain(newEvent);

    });
    test('onDeleteEvent debe borrar el evento', () => {
        const state = calendarSlice.reducer(calendarWithActiveEventsState, onDeleteEvent());
        expect(state.activeEvent).toBe(null);
        expect(state.events).not.toContain(events[0]);
    });
    test('onLoadEvents debe de establecer los eventos', () => {
        const state = calendarSlice.reducer(initialState, onLoadEvents(events));
        expect(state.isLoadingEvents).toBeFalsy();
        expect(state.events).toEqual(events);
    });
});