import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import AppContext from './AppContext'; // Replace with the correct import path

const RouteHandler = ({ children }) => {
  const location = useLocation();
  const { setCurrentSceneID, setCurrentEventID } = useContext(AppContext);

  useEffect(() => {
    const pathParts = location.pathname.split('/').filter(Boolean);
    // Assuming your URL structure is /scenes/:sceneId/events/:eventId
    const sceneId = pathParts[1]; // 'scenes' is at index 0, sceneId should be at index 1
    const eventId = pathParts[3]; // 'events' is at index 2, eventId should be at index 3

    setCurrentSceneID(sceneId ? Number.parseInt(sceneId) : null);
    setCurrentEventID( eventId ? Number.parseInt(eventId) : null);

  }, [location, setCurrentSceneID, setCurrentEventID]);

  return children;
};

export default RouteHandler;
