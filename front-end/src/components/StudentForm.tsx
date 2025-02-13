import React from "react";
import { useForm, Controller } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createStudent } from "../services/api";
import type { Student } from "../types/Student";
import dayjs from "dayjs";

const StudentForm = () => {
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState("");

  const defaultValues = {
    nombre: "",
    nombrePadre: "",
    nombreMadre: "",
    grado: "",
    seccion: "",
    fechaNacimiento: null,
    fechaIngreso: null,
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Student>({
    defaultValues,
  });

  const onSubmit = async (data: Student) => {
    try {
      console.log("Datos a enviar:", data);
      const response = await createStudent(data);
      console.log("Respuesta:", response);
      setSuccess(true);
      setError("");
      reset();
    } catch (error: any) {
      console.error("Error completo:", error);
      setError(
        error.response?.data || error.message || "Error al crear estudiante"
      );
      setSuccess(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gray-800 rounded-lg shadow-xl mt-5 border border-gray-700">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-100">
            Registrar Nuevo Estudiante
          </h2>

          {success && (
            <div className="mb-4 p-4 bg-green-800 text-green-100 rounded-lg border border-green-700">
              Estudiante creado exitosamente!
            </div>
          )}

          {error && (
            <div className="mb-4 p-4 bg-red-800 text-red-100 rounded-lg border border-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <Controller
              name="nombre"
              control={control}
              rules={{ required: "El nombre es requerido" }}
              render={({ field }) => (
                <div>
                  <input
                    {...field}
                    placeholder="Nombre"
                    className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 focus:outline-none focus:border-purple-500"
                  />
                  {errors.nombre && (
                    <p className="mt-1 text-red-400 text-sm">
                      {errors.nombre.message}
                    </p>
                  )}
                </div>
              )}
            />

            <Controller
              name="nombrePadre"
              control={control}
              rules={{ required: "El nombre del padre es requerido" }}
              render={({ field }) => (
                <div>
                  <input
                    {...field}
                    placeholder="Nombre del Padre"
                    className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 focus:outline-none focus:border-purple-500"
                  />
                  {errors.nombrePadre && (
                    <p className="mt-1 text-red-400 text-sm">
                      {errors.nombrePadre.message}
                    </p>
                  )}
                </div>
              )}
            />

            <Controller
              name="nombreMadre"
              control={control}
              rules={{ required: "El nombre de la madre es requerido" }}
              render={({ field }) => (
                <div>
                  <input
                    {...field}
                    placeholder="Nombre de la Madre"
                    className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 focus:outline-none focus:border-purple-500"
                  />
                  {errors.nombreMadre && (
                    <p className="mt-1 text-red-400 text-sm">
                      {errors.nombreMadre.message}
                    </p>
                  )}
                </div>
              )}
            />

            <Controller
              name="grado"
              control={control}
              rules={{ required: "El grado es requerido" }}
              render={({ field }) => (
                <div>
                  <input
                    {...field}
                    placeholder="Grado"
                    className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 focus:outline-none focus:border-purple-500"
                  />
                  {errors.grado && (
                    <p className="mt-1 text-red-400 text-sm">
                      {errors.grado.message}
                    </p>
                  )}
                </div>
              )}
            />

            <Controller
              name="seccion"
              control={control}
              rules={{ required: "La sección es requerida" }}
              render={({ field }) => (
                <div>
                  <input
                    {...field}
                    placeholder="Sección"
                    className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 focus:outline-none focus:border-purple-500"
                  />
                  {errors.seccion && (
                    <p className="mt-1 text-red-400 text-sm">
                      {errors.seccion.message}
                    </p>
                  )}
                </div>
              )}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Controller
                  name="fechaNacimiento"
                  control={control}
                  rules={{ required: "La fecha de nacimiento es requerida" }}
                  render={({ field }) => (
                    <div>
                      <DatePicker
                        label="Fecha de Nacimiento"
                        value={field.value}
                        onChange={(newValue) => field.onChange(newValue)}
                        className="w-full"
                        slotProps={{
                          textField: {
                            error: !!errors.fechaNacimiento,
                            helperText: errors.fechaNacimiento?.message,
                            className:
                              "w-full bg-gray-700 text-gray-100 rounded-lg",
                          },
                        }}
                      />
                    </div>
                  )}
                />

                <Controller
                  name="fechaIngreso"
                  control={control}
                  rules={{ required: "La fecha de ingreso es requerida" }}
                  render={({ field }) => (
                    <div>
                      <DatePicker
                        label="Fecha de Ingreso"
                        value={field.value}
                        onChange={(newValue) => field.onChange(newValue)}
                        className="w-full"
                        slotProps={{
                          textField: {
                            error: !!errors.fechaIngreso,
                            helperText: errors.fechaIngreso?.message,
                            className:
                              "w-full bg-gray-700 text-gray-100 rounded-lg",
                          },
                        }}
                      />
                    </div>
                  )}
                />
              </div>
            </LocalizationProvider>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors duration-200 mt-6"
            >
              Registrar Estudiante
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentForm;
