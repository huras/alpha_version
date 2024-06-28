// Dashbaord empty component
import React, { useContext, useEffect, useState } from "react";
import SceneList from "../Scene/SceneList";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Breadcrumb from "../Breadcrumb";
import ProjectContext from "../../context/ProjectContext";

const ProjectPage = () => {
    const { project, fetch_project_data } = useContext(ProjectContext);
    const [error, setError] = useState('');

    useEffect(() => {
        var idToUse = undefined;
        if (!project) {
            const urlParams = new URLSearchParams(window.location.search);
            idToUse = urlParams.get('id');
        } else {
            // if (project) return;
            idToUse = project.id;
        }
        if(!idToUse) return;

        fetch_project_data(idToUse);
    }, []);

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