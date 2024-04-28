// Dashbaord empty component
import React from "react";
import SceneList from "./Scene/SceneList";

const Dashboard = () => {
    
    return <div className="container">
            <h1>Dashboard</h1>
            <h2>Scenes</h2>
            <SceneList />
        </div>
}

export default Dashboard;