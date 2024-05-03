import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { SceneEditor } from "./pages/Scene/SceneEditor";
import { AppProvider } from "./context/AppContext"; // Import the AppProvider
import Dashboard from "./pages/Dashboard";
import ScenePage from "./pages/Scene/ScenePage";
import RouteHandler from "./context/RouteHandler";
import ProjectPage from "./pages/Project/ProjectPage";
import { ProjectProvider } from "./context/ProjectContext";

const App = () => {
  return (
    <ProjectProvider >
      <Router>
        <RouteHandler>
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
            <Route path="/" element={<Dashboard />} />
            {/* <Route path="/projects/:id" element={<ProjectPage />} /> */}
            <Route path="/project" element={<ProjectPage />} />

            <Route path="/scene" element={<ScenePage />} />
            <Route path="/edit/scene" element={<SceneEditor />} />
            <Route path="/edit/event" element={<SceneEditor />} />
          </Routes>
        </RouteHandler>
      </Router>
    </ProjectProvider>
  );
};

const root = document.getElementById("root");
ReactDOM.createRoot(root).render(
  <AppProvider>
    {/* Wrap your App component with AppProvider */}
    <App />
  </AppProvider>
);
