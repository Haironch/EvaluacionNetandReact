import React, { useState } from 'react';
import {
  Container,
  Box,
  Tabs,
  Tab,
  Typography,
  Paper
} from '@mui/material';
import StudentForm from './StudentForm';
import StudentList from './StudentList';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const Home = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ mb: 4, p: 2 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Sistema de Gestión Estudiantil
        </Typography>
      </Paper>

      <Paper elevation={3}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={currentTab} 
            onChange={handleTabChange}
            variant="fullWidth"
          >
            <Tab label="Lista de Estudiantes" />
            <Tab label="Registrar Estudiante" />
          </Tabs>
        </Box>

        <TabPanel value={currentTab} index={0}>
          <StudentList />
        </TabPanel>
        <TabPanel value={currentTab} index={1}>
          <StudentForm />
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default Home;