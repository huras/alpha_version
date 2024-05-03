import React, { useContext, useEffect, useState } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import AppContext from '../../context/AppContext';
import { EyeFill, PencilFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ProjectList() {
    // const { currentSceneID, setCurrentSceneID, setCurrentScene, currentEventID } = useContext(AppContext);
    const [projects, setProjects] = useState([]);
    const [ currentScene, setCurrentScene ] = useState(null);
    const [ currentSceneID, setCurrentSceneID ] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/project')
          .then(res => setProjects(res.data))
          .catch(err => console.log(err));
    }, []);

    const handleCheckScene = (sceneID) => {
        setCurrentScene( Number.parseInt(sceneID) );
        setCurrentSceneID(null);
    }

    return (
        <div>
            {projects.map(project => (
                <Card key={project.id} className="mb-3">
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Link to={`/project?project=${project.id}`} onClick={() => handleCheckScene(project.id)}>
                                <EyeFill size={16} />
                            </Link>
                        </ListGroup.Item>
                        <ListGroup.Item><strong>Title:</strong> {project.title}</ListGroup.Item>
                        <ListGroup.Item><strong>Created At:</strong> {new Date(project.createdAt).toLocaleString()}</ListGroup.Item>
                        <ListGroup.Item><strong>Updated At:</strong> {new Date(project.updatedAt).toLocaleString()}</ListGroup.Item>
                    </ListGroup>
                </Card>
            ))}
        </div>
    )
}
