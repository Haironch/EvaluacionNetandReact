import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Home from "./components/Home";
import "dayjs/locale/es";

// Importamos los estilos globales de Tailwind
import "./index.css";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <div className="min-h-screen bg-gray-900 text-gray-100 py-8">
        <Home />
      </div>
    </LocalizationProvider>
  );
}

export default App;
