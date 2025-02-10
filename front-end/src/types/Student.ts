// types/Student.ts
export interface Student {
  nombre: string;
  nombrePadre: string;
  nombreMadre: string;
  grado: string;
  seccion: string;
  fechaNacimiento: Date | null;
  fechaIngreso: Date | null;
}