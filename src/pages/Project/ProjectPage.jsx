// Dashbaord empty component
import React, { useContext, useEffect, useState } from "react";
import SceneList from "../Scene/SceneList";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Breadcrumb from "../Breadcrumb";
import ProjectContext from "../../context/ProjectContext";

const ProjectPage = () => {
    const { project } = useContext(ProjectContext);
    const [error, setError] = useState('');

    useEffect(() => {
    }, [project]);

    if (error) return <p>Error loading events: {error}</p>;

    return <div className="container">
            <Breadcrumb
                project={project}
            ></Breadcrumb>
            <h2>Scenes</h2>
            {project && <SceneList />}
        </div>
}

export default ProjectPage;