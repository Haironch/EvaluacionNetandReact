import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Typography,
  TextField,
  Box,
  CircularProgress,
  Alert,
  IconButton,
  InputAdornment,
  Tabs,
  Tab,
  Divider
} from '@mui/material';
import { Search as SearchIcon, Refresh as RefreshIcon } from '@mui/icons-material';
import { getStudents, getStudentsByGrade } from '../services/api';
import type { Student } from '../types/Student';

const StudentList = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchGrade, setSearchGrade] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentTab, setCurrentTab] = useState(0);

  const loadStudents = async () => {
    try {
      setLoading(true);
      const data = await getStudents();
      setStudents(data);
      setError('');
    } catch (err) {
      setError('Error al cargar estudiantes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const searchByGrade = async () => {
    if (!searchGrade.trim()) {
      loadStudents();
      return;
    }
    try {
      setLoading(true);
      const data = await getStudentsByGrade(searchGrade);
      setStudents(data);
      setError('');
    } catch (err) {
      setError('Error al buscar por grado');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const filteredStudents = currentTab === 0 
    ? students 
    : students.filter(student => student.grado === String(currentTab));

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4, mb: 3 }}>
        <Typography variant="h4" component="h2">
          Lista de Estudiantes
        </Typography>
        <IconButton onClick={loadStudents} color="primary" title="Actualizar lista">
          <RefreshIcon />
        </IconButton>
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="Buscar por Grado"
          value={searchGrade}
          onChange={(e) => setSearchGrade(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && searchByGrade()}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={searchByGrade}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 2 }}
      >
        <Tab label="Todos" />
        <Tab label="1° Grado" />
        <Tab label="2° Grado" />
        <Tab label="3° Grado" />
        <Tab label="4° Grado" />
        <Tab label="5° Grado" />
        <Tab label="6° Grado" />
      </Tabs>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
      ) : filteredStudents.length === 0 ? (
        <Alert severity="info" sx={{ mb: 2 }}>No se encontraron estudiantes</Alert>
      ) : (
        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Grado</TableCell>
                <TableCell>Sección</TableCell>
                <TableCell>Fecha Nacimiento</TableCell>
                <TableCell>Fecha Ingreso</TableCell>
                <TableCell>Nombre Padre</TableCell>
                <TableCell>Nombre Madre</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id} hover>
                  <TableCell>{student.nombre}</TableCell>
                  <TableCell>{student.grado}°</TableCell>
                  <TableCell>{student.seccion}</TableCell>
                  <TableCell>{formatDate(student.fechaNacimiento)}</TableCell>
                  <TableCell>{formatDate(student.fechaIngreso)}</TableCell>
                  <TableCell>{student.nombrePadre}</TableCell>
                  <TableCell>{student.nombreMadre}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default StudentList;