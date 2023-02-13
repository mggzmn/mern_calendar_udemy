import calendarApi from "../../src/api/calendarApi";

describe('Pruebas en el calendarApi', () => {
    test('debe de tener la configuración por defecto', () => {
        expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL)
    });
    test('debe de tener el x-token en el header de todas las peticiones', async () => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2M2VhNjVlNjlhMDgyMTA3MGM4NDc3MmEiLCJuYW1lIjoiVGVzdCBVc2VyIiwiaWF0IjoxNjc2MzA5ODU0LCJleHAiOjE2NzYzMTcwNTR9.EsBpr3ZcUadmWuX2c7MA2U6T_nFCHi3bfQJUR-QuPmg'
        localStorage.setItem('token', token);
        const res = await calendarApi.get('/auth');
        expect(res.config.headers['x-token']).toBe(token)
    });
});

