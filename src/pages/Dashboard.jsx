// Dashbaord empty component
import React from "react";
import SceneList from "./Scene/SceneList";
import ProjectList from "./Project/ProjectList";

const Dashboard = () => {
    
    return <div className="container">
            <h1>Dashboard</h1>
            <h2>Projects</h2>
            <ProjectList />
        </div>
}

export default Dashboard;