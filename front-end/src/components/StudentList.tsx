import React, { useEffect, useState } from "react";
import {
  getStudents,
  getStudentsByGrade,
  deleteStudent,
} from "../services/api";
import type { Student } from "../types/Student";
import { AxiosError } from "axios";

const StudentList = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchGrade, setSearchGrade] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentTab, setCurrentTab] = useState(0);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  const loadStudents = async () => {
    try {
      setLoading(true);
      const data = await getStudents();
      setStudents(data);
      setError("");
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(
        axiosError.response?.data?.message || "Error al cargar estudiantes"
      );
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
      setError("");
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(
        axiosError.response?.data?.message || "Error al buscar por grado"
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (studentId: string) => {
    if (
      !window.confirm("¿Estás seguro de que deseas eliminar este estudiante?")
    ) {
      return;
    }

    try {
      setDeleteLoading(studentId);
      await deleteStudent(studentId);
      setStudents((prevStudents) =>
        prevStudents.filter((student) => student.id !== studentId)
      );
      setError("");
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(
        axiosError.response?.data?.message || "Error al eliminar el estudiante"
      );
      console.error(err);
    } finally {
      setDeleteLoading(null);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleTabChange = (newValue: number) => {
    setCurrentTab(newValue);
  };

  const filteredStudents =
    currentTab === 0
      ? students
      : students.filter((student) => student.grado === String(currentTab));

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mt-8 mb-6">
        <h2 className="text-3xl font-bold text-gray-100">
          Lista de Estudiantes
        </h2>
        <button
          onClick={loadStudents}
          className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-200"
          title="Actualizar lista"
        >
          <svg
            className="w-6 h-6 text-purple-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      </div>

      <div className="mb-6 relative">
        <input
          type="text"
          className="w-full p-3 pr-12 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 focus:outline-none focus:border-purple-500"
          placeholder="Buscar por Grado"
          value={searchGrade}
          onChange={(e) => setSearchGrade(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && searchByGrade()}
        />
        <button
          onClick={searchByGrade}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-600 rounded-full transition-colors duration-200"
        >
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>

      <div className="flex overflow-x-auto mb-6 bg-gray-800 rounded-lg border border-gray-700">
        {[
          "Todos",
          "1° Grado",
          "2° Grado",
          "3° Grado",
          "4° Grado",
          "5° Grado",
          "6° Grado",
        ].map((tab, index) => (
          <button
            key={tab}
            onClick={() => handleTabChange(index)}
            className={`px-6 py-3 whitespace-nowrap transition-colors duration-200 ${
              currentTab === index
                ? "text-purple-400 border-b-2 border-purple-500"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center my-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : error ? (
        <div className="mb-4 p-4 bg-red-800 text-red-100 rounded-lg border border-red-700">
          {error}
        </div>
      ) : filteredStudents.length === 0 ? (
        <div className="mb-4 p-4 bg-blue-800 text-blue-100 rounded-lg border border-blue-700">
          No se encontraron estudiantes
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-700 mb-8">
          <table className="min-w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Grado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Sección
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Fecha Nacimiento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Fecha Ingreso
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Nombre Padre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Nombre Madre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  className="hover:bg-gray-700 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-gray-200">
                    {student.nombre}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-200">
                    {student.grado}°
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-200">
                    {student.seccion}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-200">
                    {formatDate(student.fechaNacimiento)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-200">
                    {formatDate(student.fechaIngreso)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-200">
                    {student.nombrePadre}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-200">
                    {student.nombreMadre}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleDelete(student.id)}
                      disabled={deleteLoading === student.id}
                      className={`inline-flex items-center justify-center p-2 rounded-lg ${
                        deleteLoading === student.id
                          ? "bg-red-800 cursor-not-allowed"
                          : "bg-red-600 hover:bg-red-700"
                      } text-white transition-colors duration-200`}
                      title="Eliminar estudiante"
                    >
                      {deleteLoading === student.id ? (
                        <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin" />
                      ) : (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentList;
