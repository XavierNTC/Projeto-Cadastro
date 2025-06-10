import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Cadastro from "./pages/Cadastro";
import Listagem from "./pages/Listagem";
import "./pages/styles.css";

export default function App() {
  return (
    <BrowserRouter>
      <nav className="p-4 bg-gray-200 mb-6">
        <div className="nav-buttons-container flex space-x-4">
          <Link to="/" className="btn">
            Cadastro
          </Link>
          <Link to="/listagem" className="btn">
            Listagem
          </Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Cadastro />} />
        <Route path="/listagem" element={<Listagem />} />
      </Routes>
    </BrowserRouter>
  );
}
