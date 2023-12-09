import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { SceneEditor } from "./pages/SceneEditor";
import { AppProvider } from "./context/AppContext"; // Import the AppProvider

const App = () => {
  return (
    <Router>
      {/* <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Scene Editor</Link>
            </li>
          </ul>
        </nav>
      </header> */}
      <Routes>
        <Route path="/" element={<SceneEditor />} />
      </Routes>
    </Router>
  );
};

const root = document.getElementById("root");
ReactDOM.createRoot(root).render(
  <AppProvider>
    {/* Wrap your App component with AppProvider */}
    <App />
  </AppProvider>
);
