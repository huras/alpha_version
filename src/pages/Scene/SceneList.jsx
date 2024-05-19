import React, { useContext, useEffect, useState } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import AppContext from '../../context/AppContext';
import { EyeFill, PencilFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProjectContext from '../../context/ProjectContext';

export default function SceneList() {
    // const { currentSceneID, setCurrentSceneID, setCurrentScene, currentEventID } = useContext(AppContext);
    const { project } = useContext(ProjectContext);

    const handleCheckScene = (sceneID) => {
        setCurrentScene( Number.parseInt(sceneID) );
        setCurrentSceneID(null);
    }

    return (
        <div>
            {project?.scenes?.length > 0 ? project.scenes.map(scene => (
                <Card key={scene.id} className="mb-3">
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Link to={`/scene?scene=${scene.id}&project=${project.id}`}>
                                <EyeFill size={16} />
                            </Link>
                        </ListGroup.Item>
                        <ListGroup.Item><strong>Title:</strong> {scene.title}</ListGroup.Item>
                        <ListGroup.Item><strong>Created At:</strong> {new Date(scene.createdAt).toLocaleString()}</ListGroup.Item>
                        <ListGroup.Item><strong>Updated At:</strong> {new Date(scene.updatedAt).toLocaleString()}</ListGroup.Item>
                    </ListGroup>
                </Card>
            )) : <div>No scenes available.</div>}
        </div>
    )
}
