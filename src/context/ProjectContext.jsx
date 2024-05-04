import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [project, setProject] = useState(undefined);

  function preprocess_incoming_project_data(data) {
    
    //iterate with key and value of data.scenes!!!!
    Object.keys(data.scenes).forEach(key => {
      const scene = data.scenes[key];
      Object.keys(scene.childEvents).forEach(key => {
        const event = scene.childEvents[key];
        Object.keys(event.event_characters).forEach(key => {
          event.event_characters[key] = data.characters.find(character => character.id === event.event_characters[key].id);
        });

        Object.keys(event.event_backgrounds).forEach(key => {
          event.event_backgrounds[key] = data.backgrounds.find(background => background.id === event.event_backgrounds[key].id);
        });
      
        if(event.mugshot){
          event.mugshot = data.characters.find(character => character.id === event.mugshot.id);
        }
      });
    });

    setProject(data);
  }

  // Fetch scenes from the backend 
  useEffect(() => {
    
      var idToUse = undefined;
      if (!project) {
          const urlParams = new URLSearchParams(window.location.search);
          idToUse = urlParams.get('project');
      } else {
          // if (project) return;
          idToUse = project.id;
      }
      if(!idToUse) return;

      axios.get(`http://localhost:8080/project/${idToUse}`)
          .then(res => {
            preprocess_incoming_project_data(res.data);
          })
          // .catch(err => {
            
          //     console.error(err);
          //     setError('Failed to fetch project');
          // })
          // .finally();
  }, []);

  const saveScene = (scene) => {
    scene.childEvents = scene.childEvents.map((event, index) => {
      event.event_characters = event.event_characters.map(character => {
        return { ...character, order: index};
      });
      return event;
    });
    // Save scene to database
    axios.put(`http://localhost:8080/scene/${scene.id}`, scene)
  }

  return (
    <ProjectContext.Provider
      value={{
        project, setProject,
        saveScene
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContext;
