import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [scenes, setScenes] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [backgrounds, setBackgrounds] = useState([]);
  const [events, setEvents] = useState([]);
  const [currentScene, setCurrentScene] = useState(null);
  const [currentEventID, setCurrentEventID] = useState(null);
  const [currentSceneID, setCurrentSceneID] = useState(null);
  const [currentEvent, setCurrentEvent] = useState(null);
/*
  // Fetch scenes from the backend 
  useEffect(() => {
    axios.get('http://localhost:8080/scene')
      .then(res => setScenes(res.data))
      .catch(err => console.log(err));
  }, []);

  // Fetch events, characters, and backgrounds based on the current scene
  useEffect(() => {
    if (currentSceneID) {
      axios.get(`http://localhost:8080/scene/${currentSceneID}/events`)
        .then(res => setEvents(res.data))
        .catch(err => console.log(err));
      
      // axios.get(`http://localhost:8080/scene/${currentSceneID}/characters`)
      //   .then(res => setCharacters(res.data))
      //   .catch(err => console.log(err));

      // axios.get(`http://localhost:8080/scene/${currentSceneID}/backgrounds`)
      //   .then(res => setBackgrounds(res.data))
      //   .catch(err => console.log(err));
    }
  }, [currentSceneID]); */

  return (
    <AppContext.Provider
      value={{
        scenes, setScenes,
        characters, setCharacters,
        backgrounds, setBackgrounds,
        events, setEvents,
        currentSceneID, setCurrentSceneID,
        currentEventID, setCurrentEventID,
        currentScene, setCurrentScene,
        currentEvent, setCurrentEvent,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
