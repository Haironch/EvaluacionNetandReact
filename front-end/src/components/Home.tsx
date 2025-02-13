import React, { useState } from "react";
import StudentForm from "./StudentForm";
import StudentList from "./StudentList";

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
      {value === index && <div className="p-6">{children}</div>}
    </div>
  );
};

const Home = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (index: number) => {
    setCurrentTab(index);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="bg-gray-800 rounded-lg shadow-xl mb-8 p-4 border border-gray-700">
        <h1 className="text-4xl font-bold text-center text-gray-100">
          Sistema de Gestión Estudiantil
        </h1>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700">
        <div className="border-b border-gray-700">
          <div className="flex">
            <button
              className={`flex-1 py-4 px-6 text-center focus:outline-none transition-colors duration-200 ${
                currentTab === 0
                  ? "border-b-2 border-purple-500 text-purple-400"
                  : "text-gray-400 hover:text-gray-200"
              }`}
              onClick={() => handleTabChange(0)}
            >
              Lista de Estudiantes
            </button>
            <button
              className={`flex-1 py-4 px-6 text-center focus:outline-none transition-colors duration-200 ${
                currentTab === 1
                  ? "border-b-2 border-purple-500 text-purple-400"
                  : "text-gray-400 hover:text-gray-200"
              }`}
              onClick={() => handleTabChange(1)}
            >
              Registrar Estudiante
            </button>
          </div>
        </div>

        <TabPanel value={currentTab} index={0}>
          <StudentList />
        </TabPanel>
        <TabPanel value={currentTab} index={1}>
          <StudentForm />
        </TabPanel>
      </div>
    </div>
  );
};

export default Home;
