import axios from 'axios';
import type { Student } from '../types/Student';

const API_URL = 'http://localhost:5010/api';
const API_KEY = 'Hairon2020'; // Ahora usamos la misma API key que funcionó en Postman

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'apikey': API_KEY,  // Cambiamos 'ApiKey' a 'apikey' (minúsculas)
        'Content-Type': 'application/json',
        'Accept': '*/*'     // Añadimos el header Accept como en Postman
    }
});

export const createStudent = async (student: Student) => {
    try {
        console.log('Intentando crear estudiante con datos:', student);
        // Asegurarnos que las fechas estén en el formato correcto
        const formattedStudent = {
            ...student,
            fechaNacimiento: new Date(student.fechaNacimiento).toISOString().split('T')[0],
            fechaIngreso: new Date(student.fechaIngreso).toISOString().split('T')[0]
        };
        
        const response = await api.post('/Students', formattedStudent);
        return response.data;
    } catch (error: any) {
        console.error('Error completo:', error);
        if (error.response) {
            // El servidor respondió con un status code fuera del rango 2xx
            console.error('Error data:', error.response.data);
            console.error('Error status:', error.response.status);
            console.error('Error headers:', error.response.headers);
        }
        throw error;
    }
};

export const getStudents = async () => {
    const response = await api.get('/Students');
    return response.data;
};

export const getStudentsByGrade = async (grado: string) => {
    const response = await api.get(`/Students/grado/${grado}`);
    return response.data;
};