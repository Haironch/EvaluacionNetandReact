import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { 
  TextField, 
  Button, 
  Box, 
  Card, 
  CardContent, 
  Typography,
  Container,
  Alert
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { createStudent } from '../services/api';
import type { Student } from '../types/Student';
import dayjs from 'dayjs';

const StudentForm = () => {
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState('');
  
  // Definir valores por defecto para todos los campos
  const defaultValues = {
    nombre: '',
    nombrePadre: '',
    nombreMadre: '',
    grado: '',
    seccion: '',
    fechaNacimiento: null,
    fechaIngreso: null
  };
  
  const { control, handleSubmit, reset, formState: { errors } } = useForm<Student>({
    defaultValues
  });

  const onSubmit = async (data: Student) => {
    try {
      console.log('Datos a enviar:', data);
      const response = await createStudent(data);
      console.log('Respuesta:', response);
      setSuccess(true);
      setError('');
      reset();
    } catch (error: any) {
      console.error('Error completo:', error);
      setError(error.response?.data || error.message || 'Error al crear estudiante');
      setSuccess(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ mt: 5 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Registrar Nuevo Estudiante
          </Typography>
          
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Estudiante creado exitosamente!
            </Alert>
          )}
          
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Controller
              name="nombre"
              control={control}
              rules={{ required: 'El nombre es requerido' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nombre"
                  fullWidth
                  margin="normal"
                  error={!!errors.nombre}
                  helperText={errors.nombre?.message}
                />
              )}
            />

            <Controller
              name="nombrePadre"
              control={control}
              rules={{ required: 'El nombre del padre es requerido' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nombre del Padre"
                  fullWidth
                  margin="normal"
                  error={!!errors.nombrePadre}
                  helperText={errors.nombrePadre?.message}
                />
              )}
            />

            <Controller
              name="nombreMadre"
              control={control}
              rules={{ required: 'El nombre de la madre es requerido' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nombre de la Madre"
                  fullWidth
                  margin="normal"
                  error={!!errors.nombreMadre}
                  helperText={errors.nombreMadre?.message}
                />
              )}
            />

            <Controller
              name="grado"
              control={control}
              rules={{ required: 'El grado es requerido' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Grado"
                  fullWidth
                  margin="normal"
                  error={!!errors.grado}
                  helperText={errors.grado?.message}
                />
              )}
            />

            <Controller
              name="seccion"
              control={control}
              rules={{ required: 'La sección es requerida' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Sección"
                  fullWidth
                  margin="normal"
                  error={!!errors.seccion}
                  helperText={errors.seccion?.message}
                />
              )}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="fechaNacimiento"
                control={control}
                rules={{ required: 'La fecha de nacimiento es requerida' }}
                render={({ field }) => (
                  <DatePicker
                    label="Fecha de Nacimiento"
                    value={field.value}
                    onChange={(newValue) => field.onChange(newValue)}
                    slotProps={{
                      textField: {
                        error: !!errors.fechaNacimiento,
                        helperText: errors.fechaNacimiento?.message,
                        fullWidth: true,
                        margin: "normal"
                      }
                    }}
                  />
                )}
              />

              <Controller
                name="fechaIngreso"
                control={control}
                rules={{ required: 'La fecha de ingreso es requerida' }}
                render={({ field }) => (
                  <DatePicker
                    label="Fecha de Ingreso"
                    value={field.value}
                    onChange={(newValue) => field.onChange(newValue)}
                    slotProps={{
                      textField: {
                        error: !!errors.fechaIngreso,
                        helperText: errors.fechaIngreso?.message,
                        fullWidth: true,
                        margin: "normal"
                      }
                    }}
                  />
                )}
              />
            </LocalizationProvider>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
            >
              Registrar Estudiante
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default StudentForm;