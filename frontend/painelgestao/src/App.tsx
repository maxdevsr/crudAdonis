import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from "react-router-dom";
import Categorias from './components/categorias';
import Cadastro from './components/cadastro/';
import Login from './components/login';
import Home from './components/Home';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    return token !== null && token !== undefined;
  };

  const logout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <nav>
        <ul>
          {isAuthenticated && (
            <li>
              <Link to="/home">Home</Link>
            </li>
          )}
          <li>
            {isAuthenticated ? (
              <button onClick={logout}>Sair</button>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signin" element={<Cadastro />} />
        <Route
          path="/"
          element={checkAuth() ? <Home /> : <Navigate to="/login" />}
        />
        <Route path="/home" element={checkAuth() ? <Home /> : <Navigate to="/login" />} />
        {/* Adicione outras rotas aqui */}
      </Routes>
    </Router>
  );
}

export default App;
